# Backend Audit Review

## Scope

This review covers the backend-facing parts of the repository:

- Next.js API routes in `app/api`
- Sanity data clients and query layer in `lib/sanity`
- Data mutation scripts in `scripts`
- Schema-to-runtime consistency for Sanity-backed content

## Executive Summary

The backend is functional in structure, but it currently has a few important integrity and safety problems:

1. The Sanity product schema expects category references, while the seeding and scraping scripts still write category strings.
2. The production build is currently failing because the runtime payload shape and the declared `Product` type disagree.
3. Draft mode disabling accepts a user-controlled redirect target without validating it as a safe internal path.
4. Secret-bearing Sanity configuration is mixed into a reusable client module, which increases the chance of accidental token exposure.
5. The mutation scripts are powerful but have very weak operational safeguards.

## Validation Status

- `npm run build`: fails
- `npm run lint`: fails with a large number of diagnostics, which reduces confidence that backend regressions will be caught early

### Build failure observed

`app/api/download-catalog/route.ts` references `product.manufacturer`, but `manufacturer` is not part of the declared `Product` interface.

Relevant references:

- [app/api/download-catalog/route.ts](/C:/code/shivam-machines/app/api/download-catalog/route.ts#L31)
- [lib/sanity/types.ts](/C:/code/shivam-machines/lib/sanity/types.ts#L21)

## Findings

### 1. High: Product category storage is inconsistent across schema, queries, and scripts

Relevant references:

- [sanity/schemas/product.ts](/C:/code/shivam-machines/sanity/schemas/product.ts#L30)
- [lib/sanity/queries.ts](/C:/code/shivam-machines/lib/sanity/queries.ts#L4)
- [scripts/seed-sanity.ts](/C:/code/shivam-machines/scripts/seed-sanity.ts#L118)
- [scripts/scrape-products.ts](/C:/code/shivam-machines/scripts/scrape-products.ts#L263)

What is happening:

- The schema defines `product.category` as a required reference to `machineToolCategory`.
- The GROQ queries dereference that field with `category->{...}`, which only works when the stored value is a reference.
- The seed and scrape scripts still write plain strings like `"grinding"` or `"lathe"` into `category`.

Why this is a problem:

- Seeded and scraped documents can violate the schema contract.
- Queries that expect dereferencing may return `null` or incomplete category objects.
- The UI is already compensating for this with fuzzy matching logic instead of relying on a stable backend contract.
- This creates fragile behavior and makes future migrations harder.

Recommended solution:

- Pick one canonical shape and enforce it everywhere. The correct choice here is the schema’s reference model.
- Seed categories first, collect their `_id`s, and write `category: { _type: "reference", _ref: categoryId }` for all products.
- Update the scraper to resolve a category slug to an existing category document before creating a product.
- Add a one-time migration script to convert legacy string categories into references.

Why this fix is better:

- Queries become predictable.
- Filtering becomes simpler.
- Studio data stays valid.
- Frontend code can stop guessing category identity.

### 2. High: Runtime product shape and TypeScript product shape are out of sync

Relevant references:

- [app/api/download-catalog/route.ts](/C:/code/shivam-machines/app/api/download-catalog/route.ts#L19)
- [lib/sanity/types.ts](/C:/code/shivam-machines/lib/sanity/types.ts#L21)
- [sanity/schemas/product.ts](/C:/code/shivam-machines/sanity/schemas/product.ts#L98)
- [scripts/scrape-products.ts](/C:/code/shivam-machines/scripts/scrape-products.ts#L268)

What is happening:

- The build fails because `route.ts` reads `product.manufacturer`.
- The `Product` interface does not define a top-level `manufacturer`.
- The schema places `manufacturer` inside `technicalSpecs`.
- The scraper writes `manufacturer` as a top-level field anyway.

Why this is a problem:

- The code does not compile for production.
- The persisted document shape is inconsistent.
- Any downstream consumer of `Product` has to guess where manufacturer data lives.

Recommended solution:

- Normalize the model immediately.
- Keep `manufacturer` inside `technicalSpecs` only, because that is what the schema already defines.
- Update `scripts/scrape-products.ts` to write `technicalSpecs: { ...technicalSpecs, manufacturer }`.
- Update `app/api/download-catalog/route.ts` to read `product.technicalSpecs?.manufacturer`.
- Tighten the `Product` type so it matches the exact query result, not an approximate superset.

Why this fix is better:

- The build passes.
- The stored documents match the schema.
- PDF/catalog generation uses one stable field path.

### 3. Medium: Draft mode disable route allows unsafe redirect construction

Relevant reference:

- [app/api/draft-mode/disable/route.ts](/C:/code/shivam-machines/app/api/draft-mode/disable/route.ts#L4)

What is happening:

- The route reads `sanity-preview-pathname` from the request query string.
- It feeds that value directly into `new URL(pathname, request.url)`.

Why this is a problem:

- If an absolute URL is supplied, `new URL` will accept it.
- That can turn the endpoint into an open redirect or at least a redirect gadget.
- Preview and draft endpoints are common security targets because they often sit behind weaker validation.

Recommended solution:

- Only allow relative paths that start with `/`.
- Reject values containing a protocol or host.
- Consider a small allowlist such as `/`, `/products`, `/about`, `/contact`, and product detail paths.

Example approach:

```ts
const pathname = searchParams.get("sanity-preview-pathname") || "/";
if (!pathname.startsWith("/") || pathname.startsWith("//")) {
  return NextResponse.json({ error: "Invalid redirect path" }, { status: 400 });
}
return NextResponse.redirect(new URL(pathname, request.url));
```

Why this fix is better:

- It removes an avoidable redirect vulnerability.
- It keeps preview exit behavior predictable.

### 4. Medium: Secret-bearing Sanity config is too easy to import into the wrong runtime

Relevant references:

- [lib/sanity/client.ts](/C:/code/shivam-machines/lib/sanity/client.ts#L4)
- [lib/sanity/env.ts](/C:/code/shivam-machines/lib/sanity/env.ts#L2)
- [lib/sanity/server.ts](/C:/code/shivam-machines/lib/sanity/server.ts#L4)

What is happening:

- `lib/sanity/client.ts` includes `process.env.SANITY_VIEWER_TOKEN`.
- That module is named like a general-purpose client and can be imported broadly.
- `env.ts` uses non-null assertions for required values and fails only at runtime.

Why this is a problem:

- Even if the token is not currently leaking, the module design makes accidental leakage much easier later.
- Shared modules should not silently carry secrets unless they are server-only by construction.
- Missing env vars will fail late and unclearly.

Recommended solution:

- Split Sanity setup into:
  - a public read-only client with no secret token
  - a server-only preview client
  - a server-only write client
- Add `import "server-only"` to server-only modules.
- Replace non-null assertions with explicit env validation at startup.

Why this fix is better:

- Secret boundaries become obvious.
- Refactors are safer.
- Misconfiguration fails early with useful errors.

### 5. Medium: Data mutation scripts are operationally risky

Relevant references:

- [scripts/delete-products.ts](/C:/code/shivam-machines/scripts/delete-products.ts#L14)
- [scripts/seed-sanity.ts](/C:/code/shivam-machines/scripts/seed-sanity.ts#L30)
- [scripts/scrape-products.ts](/C:/code/shivam-machines/scripts/scrape-products.ts#L145)

What is happening:

- `delete-products.ts` deletes all products immediately with no confirmation, no dry-run mode, and no environment guard.
- `scrape-products.ts` creates products directly and does not first check for existing slugs before write.
- `seed-sanity.ts` performs many direct mutations but does not isolate changes in transactions or provide a rollback strategy.

Why this is a problem:

- One accidental run against production can destroy content.
- Partial failures leave the dataset in mixed states.
- Re-running scripts can create duplicate or inconsistent data depending on the script.

Recommended solution:

- Add a required confirmation flag for destructive scripts, for example `--confirm-delete-all-products`.
- Add `--dry-run` support to every mutation script.
- Require an explicit dataset allowlist or environment name before writes.
- Resolve by slug before create, and use `createIfNotExists` / patch flows where appropriate.
- Log a structured summary at the end: created, updated, skipped, failed.

Why this fix is better:

- Safer operations.
- Easier recovery.
- Better repeatability across environments.

## Secondary Concerns

### Encoding issues in script output

Relevant reference:

- [scripts/seed-sanity.ts](/C:/code/shivam-machines/scripts/seed-sanity.ts#L12)

The script output shows mojibake characters instead of the intended symbols. This is not a functional backend bug, but it makes operational logs harder to trust. Prefer plain ASCII log messages for portability.

### Build and lint signal quality is weak

The backend-specific issues above were not prevented before reaching build time. A large lint backlog reduces the value of CI because important errors are buried in noise. Reducing baseline warnings will materially improve backend reliability.

## Recommended Fix Order

1. Fix the `Product` shape mismatch and restore a passing production build.
2. Migrate `product.category` to real references and update all seed/scrape paths.
3. Lock down the draft-mode redirect.
4. Split server-only Sanity clients from public clients and validate env explicitly.
5. Add dry-run and confirmation safeguards to every write script.

## Bottom Line

The biggest issue is not one isolated bug. It is that the Sanity data contract is currently inconsistent across schema, queries, scripts, and runtime types. Once that contract is cleaned up, the rest of the backend becomes much more predictable, safer to operate, and easier to extend.
