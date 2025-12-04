# Presentation Tool - Documents Not Showing

## Why Documents Don't Appear

The Presentation Tool shows documents in the sidebar when:
1. **Documents exist in Sanity** - You must have created content in Sanity Studio
2. **Documents are published** - Draft documents won't show unless draft mode is enabled
3. **Documents are rendered on the page** - The content must actually be displayed in the preview
4. **Stega encoding is working** - Documents must be fetched with stega encoding when draft mode is enabled
5. **Resolve locations are configured** - The Presentation Tool needs to know how to map documents to routes

## Quick Checklist

### 1. Verify Content Exists in Sanity

1. Open Sanity Studio: `http://localhost:3000/studio`
2. Check each document type:
   - **Hero** - Should have at least 1 document
   - **Product** - Should have at least 1 product
   - **About** - Should have 1 document
   - **Footer** - Should have 1 document
   - **CTA** - Should have at least 1 CTA
   - **Machine Tool Category** - Should have categories
   - **Recently Added** - Should have 1 document

3. **Important**: Make sure documents are **Published** (not just saved as drafts)

### 2. Verify Content is Rendered

1. Open your site in Presentation Tool
2. Check if content is actually visible on the page:
   - Hero section should show
   - Products should be listed
   - About section should display
   - Footer should be visible

3. If the page is empty, documents won't appear in the sidebar

### 3. Check Draft Mode

1. When using Presentation Tool, draft mode should be automatically enabled
2. Check browser cookies - you should see `__prerender_bypass` cookie
3. Check browser console for any errors

### 4. Verify Resolve Configuration

The resolve configuration is in `lib/presentation/resolve.ts` and maps:
- `hero` → `/`
- `product` → `/` and `/products/{slug}`
- `about` → `/`
- `cta` → `/`
- `footer` → `/`
- `machineToolCategory` → `/`
- `recentlyAdded` → `/`

### 5. Restart Studio

After making configuration changes:
1. Stop Sanity Studio (Ctrl+C)
2. Restart: `npm run studio`
3. Refresh the browser

## Common Issues

### Issue: "No matching documents"

**Cause**: No content exists in Sanity or content isn't published

**Solution**:
1. Create content in Sanity Studio
2. Make sure to click "Publish" (not just "Save draft")
3. Refresh the Presentation Tool

### Issue: Documents exist but don't show

**Cause**: Content isn't being rendered on the page or stega encoding isn't working

**Solution**:
1. Verify content is actually displayed in the preview
2. Check browser console for fetch errors
3. Ensure components use `getDraftClient()` for fetching
4. Verify `SANITY_VIEWER_TOKEN` is set correctly

### Issue: Some documents show, others don't

**Cause**: Those document types might not be configured in resolve locations

**Solution**:
1. Check `lib/presentation/resolve.ts`
2. Ensure all document types you use are included
3. Restart Studio after changes

## Testing Steps

1. **Create Test Content**:
   - Go to Sanity Studio
   - Create a Hero document with title "Test Hero"
   - Create a Product with title "Test Product"
   - **Publish both documents**

2. **Open Presentation Tool**:
   - In Studio, click "Presentation" tab
   - The preview should show your content

3. **Check Sidebar**:
   - Right sidebar should show "Documents on this page"
   - You should see "Test Hero" and "Test Product" listed

4. **If Still Empty**:
   - Check browser console for errors
   - Verify content is actually rendered (not null/empty)
   - Check that draft mode is enabled (check cookies)

## Debug Mode

To see what's happening, check:
1. Browser DevTools → Network tab → Look for Sanity API requests
2. Browser DevTools → Console → Look for errors or warnings
3. Browser DevTools → Application → Cookies → Check for `__prerender_bypass`

