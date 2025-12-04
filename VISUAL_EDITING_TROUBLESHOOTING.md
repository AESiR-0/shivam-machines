# Visual Editing Troubleshooting Guide

## Error: "Unable to connect to visual editing"

This error occurs when Visual Editing cannot find stega-encoded data in your page or cannot connect to the Studio.

## Checklist

### 1. Environment Variables ✅

Ensure these are set in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=t5ek8ov6
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
SANITY_VIEWER_TOKEN=your-viewer-token-here
SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000
```

**Important:**
- `NEXT_PUBLIC_SANITY_STUDIO_URL` must match where your Studio is accessible
- `SANITY_VIEWER_TOKEN` must be a token with Viewer permissions (not Editor/Admin)
- Restart your dev server after updating `.env.local`

### 2. All Components Use `getDraftClient()` ✅

All server components that fetch data must use `getDraftClient()` instead of `serverClient`:

```typescript
import { getDraftClient } from '@/lib/sanity/draft-client'

const draftClient = await getDraftClient()
const data = await draftClient.fetch(query)
```

**Verified components:**
- ✅ `hero-section.tsx`
- ✅ `about-section.tsx`
- ✅ `products-section.tsx`
- ✅ `ctas-section.tsx`
- ✅ `recently-added-section.tsx`
- ✅ `machine-tools-section.tsx`
- ✅ `footer-section.tsx`

### 3. VisualEditing Component Rendered ✅

The `VisualEditing` component is rendered in `app/layout.tsx` when draft mode is enabled.

### 4. Draft Mode API Route ✅

The draft mode enable route uses `defineEnableDraftMode` from `next-sanity/draft-mode`.

### 5. Client Configuration ✅

The base client has stega configured:
```typescript
stega: {
  studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
}
```

## Common Issues

### Issue: Environment Variables Not Loaded

**Solution:** Restart your Next.js dev server after updating `.env.local`

### Issue: No Content Rendered

**Solution:** Visual Editing needs actual content on the page. Ensure:
- You have content in Sanity
- Components are rendering data (not null/empty)
- Data is being fetched successfully

### Issue: Studio URL Mismatch

**Solution:** Verify `NEXT_PUBLIC_SANITY_STUDIO_URL` matches:
- Embedded Studio: `http://localhost:3000/studio`
- Hosted Studio: `https://your-project.sanity.studio`

### Issue: Token Permissions

**Solution:** Ensure `SANITY_VIEWER_TOKEN` has Viewer permissions (not Editor/Admin)

## Debug Steps

1. **Check Console Logs:**
   - Open browser DevTools
   - Look for warnings about missing environment variables
   - Check for CORS errors

2. **Verify Draft Mode:**
   - When accessing via Presentation Tool, draft mode should be enabled
   - Check cookies for `__prerender_bypass`

3. **Check Network Tab:**
   - Verify requests to Sanity API include the token
   - Check if stega metadata is in responses

4. **Verify Content:**
   - Ensure at least one component renders actual content
   - Check that data is not null/undefined

## Testing

1. Start your Next.js app: `npm run dev`
2. Start Sanity Studio: `npm run studio`
3. Open Studio at `http://localhost:3000/studio`
4. Use Presentation Tool to preview your site
5. Visual Editing should connect and show overlays

## Still Not Working?

1. Check browser console for specific error messages
2. Verify all environment variables are set correctly
3. Ensure you're accessing the site through Presentation Tool (not directly)
4. Check that content exists in Sanity and is being fetched
5. Verify `next-sanity` version is `^11.6.10` or higher

