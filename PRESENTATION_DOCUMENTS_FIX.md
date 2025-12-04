# Fix: Documents Not Showing in Presentation Tool

## The Problem

Documents exist in Structure but don't appear in Presentation Tool sidebar.

## Root Cause

The Presentation Tool **only shows documents that are:**
1. ✅ **Rendered on the current page** (with stega encoding)
2. ✅ **Matched by resolve locations** configuration
3. ✅ **Published or accessible as drafts**

It does **NOT** show all documents - only those visible on the current page.

## Solution Steps

### Step 1: Verify Documents Are Actually Rendered

1. Open your homepage: `http://localhost:3000`
2. **Check if content is visible**:
   - Hero section should display
   - Products should be listed
   - About section should show
   - Footer should be visible

3. **If page is empty**, documents won't appear in Presentation Tool

### Step 2: Verify Documents Are Published

1. Open Sanity Studio: `http://localhost:3000/studio`
2. Go to Structure tool
3. For each document type:
   - Check if documents exist
   - **Click "Publish" button** (not just "Save draft")
   - Documents must be published to appear in Presentation Tool

### Step 3: Check Resolve Configuration

The resolve configuration in `lib/presentation/resolve.ts` maps document types to routes:

- ✅ `hero` → `/` (homepage)
- ✅ `product` → `/` and `/products/{slug}`
- ✅ `about` → `/`
- ✅ `cta` → `/`
- ✅ `footer` → `/`
- ✅ `machineToolCategory` → `/`
- ✅ `recentlyAdded` → `/`

**All documents resolve to homepage (`/`)** - make sure they're actually rendered there.

### Step 4: Restart Studio After Changes

After any configuration changes:

```bash
# Stop the dev server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test in Presentation Tool

1. Open Sanity Studio: `http://localhost:3000/studio`
2. Click **"Presentation"** tab
3. Wait for preview to load
4. Check **right sidebar** for "Documents on this page"
5. Documents should appear if they're rendered on the page

## Common Issues

### Issue: "No documents found"

**Cause**: Documents aren't rendered on the page or aren't published

**Fix**:
1. Verify content is visible on homepage
2. Publish documents in Structure tool
3. Refresh Presentation Tool

### Issue: Some documents show, others don't

**Cause**: Those document types aren't rendered on the current page

**Fix**:
1. Check which components are rendered on homepage
2. Ensure all document types are fetched and displayed
3. Verify `getDraftClient()` is used in all server components

### Issue: Documents show in Structure but not Presentation

**Cause**: Documents exist but aren't rendered on the page

**Fix**:
1. Check if components are actually rendering the data
2. Verify data isn't null/empty
3. Check browser console for fetch errors

## Testing Checklist

- [ ] Documents exist in Structure tool
- [ ] Documents are **published** (not just drafts)
- [ ] Content is visible on homepage (`http://localhost:3000`)
- [ ] All server components use `getDraftClient()`
- [ ] `lib/sanity/client.ts` has `stega` configuration
- [ ] `lib/presentation/resolve.ts` has all document types
- [ ] Studio has been restarted after configuration changes
- [ ] Presentation Tool preview is loaded
- [ ] Browser console has no errors

## Quick Test

1. **Create a test Hero document**:
   - Title: "Test Hero"
   - Fill in required fields
   - **Click "Publish"**

2. **Open Presentation Tool**:
   - Should see "Test Hero" in sidebar
   - If not, check if hero section is rendered on homepage

3. **If still not showing**:
   - Check browser console for errors
   - Verify hero section component is rendering data
   - Check that `getDraftClient()` is used in `hero-section.tsx`

## Debug Commands

Check if documents are being fetched:

```bash
# In browser console (on homepage):
# Look for Sanity API requests in Network tab
# Should see requests to Sanity API
```

Check if stega encoding is working:

```bash
# View page source
# Search for "data-sanity" attributes
# Should see stega metadata in HTML
```

