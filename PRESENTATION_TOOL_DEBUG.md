# Presentation Tool Debugging Guide

## Why Documents Don't Show in Presentation Tool

The Presentation Tool detects documents by:
1. **Scanning rendered HTML** for stega-encoded metadata
2. **Matching document types** using the `resolve.locations` configuration
3. **Requiring documents to be rendered** on the current page

## Common Issues

### 1. Documents Exist But Aren't Rendered
- **Problem**: Documents exist in Structure but aren't displayed on the homepage
- **Solution**: Ensure all document types are actually rendered in your components
- **Check**: Open your homepage and verify you can see the content

### 2. Resolve Configuration Mismatch
- **Problem**: Document type names don't match between schema and resolve config
- **Solution**: Ensure `resolve.locations` keys match your schema `name` exactly
- **Example**: Schema `name: 'hero'` → Resolve key `hero: defineLocations(...)`

### 3. Documents Not Published
- **Problem**: Documents exist as drafts but aren't published
- **Solution**: Publish documents in Structure tool (click "Publish" button)
- **Note**: Presentation Tool can show drafts, but they need to be accessible

### 4. Stega Encoding Not Working
- **Problem**: Data is fetched but stega metadata isn't embedded
- **Solution**: Ensure you're using `getDraftClient()` in all server components
- **Check**: Verify `lib/sanity/client.ts` has `stega` configuration

## How to Debug

### Step 1: Verify Documents Are Rendered
1. Open your homepage (`http://localhost:3000`)
2. View page source (Right-click → View Page Source)
3. Search for your document titles
4. If you can't find them, the documents aren't being rendered

### Step 2: Check Resolve Configuration
1. Open `lib/presentation/resolve.ts`
2. Verify each document type has a `defineLocations` entry
3. Ensure the key matches your schema `name` exactly
4. Check that `select` fields exist in your schema

### Step 3: Verify Schema Names
1. Open each schema file in `sanity/schemas/`
2. Check the `name` property (e.g., `name: 'hero'`)
3. Ensure this matches the key in `resolve.locations`

### Step 4: Test in Presentation Tool
1. Open Sanity Studio (`http://localhost:3000/studio`)
2. Click "Presentation" tab
3. Open the preview iframe
4. Check browser console for errors
5. Look for stega-related errors

## Current Configuration

### Document Types Configured:
- `hero` - Hero section
- `product` - Products
- `about` - About section
- `cta` - Call to action sections
- `footer` - Footer
- `machineToolCategory` - Machine tool categories
- `recentlyAdded` - Recently added section

### All Resolve to:
- Homepage (`/`) - All documents appear on homepage

## Next Steps

If documents still don't appear:

1. **Check if documents are actually rendered**:
   - Open homepage
   - Inspect HTML source
   - Verify content is visible

2. **Verify document IDs are in queries**:
   - All GROQ queries should include `_id`
   - Check `lib/sanity/queries.ts`

3. **Test with a single document type**:
   - Start with `hero` (simplest)
   - Ensure it's rendered on homepage
   - Check if it appears in Presentation Tool

4. **Check browser console**:
   - Open DevTools
   - Look for stega-related errors
   - Check for CORS or network errors

