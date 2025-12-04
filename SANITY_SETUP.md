# Sanity CMS Setup Guide

This guide will help you set up and use Sanity CMS with your Shivam Enterprise website.

## Prerequisites

1. A Sanity account (sign up at https://www.sanity.io/)
2. Node.js installed
3. Environment variables configured

## Initial Setup

### 1. Create a Sanity Project

1. Go to https://www.sanity.io/manage
2. Create a new project
3. Note your Project ID and Dataset name (usually "production")

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Public
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-01
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000

# Private
SANITY_API_TOKEN=your-token-here
SANITY_VIEWER_TOKEN=your-viewer-token-here
```

**Note:** 
- `SANITY_VIEWER_TOKEN` is required for Visual Editing and draft mode previews. Create a token with Viewer permissions in Sanity Manage → API → Tokens
- `SANITY_STUDIO_PREVIEW_ORIGIN` is the URL of your frontend application (used by Presentation Tool)
- `NEXT_PUBLIC_SANITY_STUDIO_URL` is the URL where your Studio is hosted

To get your API token:
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to API → Tokens
4. Create a new token with Editor permissions

### 3. Start Sanity Studio

Run the following command to start the Sanity Studio:

```bash
npm run studio
```

Then navigate to `http://localhost:3333` to access the Studio.

### 4. Configure CORS Origins

To access the Studio at `/studio` in your Next.js app, you need to configure CORS origins:

1. Go to https://www.sanity.io/manage
2. Select your project (Project ID: `t5ek8ov6`)
3. Go to **API** → **CORS origins**
4. Click **Add CORS origin**
5. Add the following origins:
   - `http://localhost:3000` (for local development)
   - `http://localhost:3000/studio` (alternative, if needed)
   - Your production domain (e.g., `https://yourdomain.com`)
6. Enable **Allow credentials** for authenticated requests
7. Click **Save**

**Note:** If you're only using the standalone studio (`npm run studio` at `http://localhost:3333`), you don't need to configure CORS origins.

### 5. Access Studio in Production

The Studio is available at `/studio` route in your Next.js app.

## Editing Content in Sanity Studio

Once you've configured CORS and can access the Studio, here's how to edit your content:

### Accessing the Studio

1. **Via Next.js App**: Navigate to `http://localhost:3000/studio` (after configuring CORS)
2. **Standalone Studio**: Run `npm run studio` and access at `http://localhost:3333`

### Editing Content

1. **Sign In**: If prompted, sign in with your Sanity account
2. **Navigate Content Types**: Use the left sidebar to browse different content types:
   - **Hero** - Edit homepage hero section (carousel slides, titles, descriptions)
   - **Product** - Manage machine/product listings (add, edit, delete products)
   - **About** - Update about section content
   - **Footer** - Edit footer links and contact information
   - **Contact** - Update contact page details
   - **Machine Tool Category** - Manage machine categories
   - **Recently Added** - Configure recently added machines section
   - **CTA** - Edit call-to-action sections
   - **Industry** - Manage industry-specific pages
   - **Gallery** - Upload and manage image galleries

3. **Creating New Content**:
   - Click on a content type in the sidebar
   - Click the **"Create"** button (usually top-right)
   - Fill in all required fields
   - Click **"Publish"** to make it live

4. **Editing Existing Content**:
   - Click on a content type to see all documents
   - Click on any document to open the editor
   - Make your changes
   - Click **"Publish"** to save changes

5. **Uploading Images**:
   - When editing a document with image fields, click the image field
   - Click **"Upload"** or drag and drop images
   - Images are automatically optimized and hosted on Sanity CDN
   - Add alt text for accessibility

6. **Rich Text Editing**:
   - Use the rich text editor for description fields
   - Format text with bold, italic, links, lists, etc.
   - Add custom blocks if configured

### Tips for Editing

- **Save Drafts**: Use "Save draft" to preview changes before publishing
- **Version History**: Sanity tracks all changes - you can revert if needed
- **References**: When linking products to categories, use the reference picker
- **Slugs**: Ensure product slugs are URL-friendly (lowercase, hyphens)
- **Required Fields**: Fields marked with `*` are required and must be filled

### Publishing Changes

- Changes are **live immediately** after clicking "Publish"
- Your Next.js app will fetch the latest data on the next page load
- For instant updates, refresh your website after publishing

## Content Types

The following content types are available in Sanity:

1. **Hero** - Homepage hero section content
2. **Product** - Machine/product listings
3. **About** - About section content
4. **Footer** - Footer links and contact info
5. **Contact** - Contact page information
6. **Machine Tool Category** - Machine categories
7. **Recently Added** - Recently added machines section
8. **CTA** - Call-to-action sections
9. **Industry** - Industry pages
10. **Gallery** - Image galleries

## Using Sanity Data in Components

### Server Components (Recommended)

```typescript
import { fetchSanityData } from '@/lib/sanity/fetch'
import { heroQuery } from '@/lib/sanity/queries'
import type { Hero } from '@/lib/sanity/types'

export default async function HeroSection() {
  const heroData = await fetchSanityData<Hero>(heroQuery)
  
  return (
    <div>
      <h1>{heroData.title}</h1>
      <p>{heroData.description}</p>
    </div>
  )
}
```

### Client Components

For client components, fetch data in a server component and pass as props:

```typescript
// app/page.tsx (Server Component)
import { fetchSanityData } from '@/lib/sanity/fetch'
import { heroQuery } from '@/lib/sanity/queries'
import HeroClient from '@/components/sections/hero-client'

export default async function Home() {
  const heroData = await fetchSanityData(heroQuery)
  
  return <HeroClient data={heroData} />
}
```

### Using Images

```typescript
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'

export default function ProductImage({ image }) {
  const imageUrl = urlFor(image).width(800).height(600).url()
  
  return (
    <Image
      src={imageUrl}
      alt="Product"
      width={800}
      height={600}
    />
  )
}
```

## Example: Updating Hero Component

Here's how to update the Hero component to use Sanity:

1. Create a server component wrapper:

```typescript
// components/sections/hero-wrapper.tsx
import { fetchSanityData } from '@/lib/sanity/fetch'
import { heroQuery } from '@/lib/sanity/queries'
import HeroClient from './hero-client'

export default async function Hero() {
  const heroData = await fetchSanityData(heroQuery)
  
  return <HeroClient data={heroData} />
}
```

2. Update the client component to accept props:

```typescript
// components/sections/hero-client.tsx
"use client"

import type { Hero } from '@/lib/sanity/types'

interface HeroProps {
  data: Hero
}

export default function HeroClient({ data }: HeroProps) {
  // Use data.title, data.description, etc.
  return (
    <section>
      <h1>{data.title}</h1>
      {/* ... rest of component */}
    </section>
  )
}
```

## Next Steps

1. Start the Sanity Studio: `npm run studio`
2. Add content through the Studio interface
3. Update components to fetch from Sanity (see examples above)
4. Test your changes locally
5. Deploy and configure environment variables in production

## Troubleshooting

### CORS Error when accessing `/studio`

If you see an error like "Access to fetch blocked by CORS policy":
1. Go to https://www.sanity.io/manage
2. Select your project
3. Navigate to **API** → **CORS origins**
4. Add `http://localhost:3000` to the allowed origins
5. Enable **Allow credentials**
6. Save and refresh your browser

### React Warning: `disableTransition` prop

If you see a warning about `disableTransition` prop:
- This is a known compatibility issue between React 19 and Sanity Studio
- The warning is harmless and doesn't affect functionality
- The Studio page has been wrapped with `suppressHydrationWarning` to minimize warnings
- The Studio will still work correctly despite this warning
- This will be fixed in future versions of `next-sanity`

### Service Worker Errors

If you see errors related to service workers:
- **404 Error for `/sw.js`**: Sanity Presentation Tool tries to register a service worker for offline features
- **Cache API Errors**: "Failed to execute 'put' on 'Cache'" errors from Workbox (service worker library)

**These are all harmless**:
- The Presentation Tool will work perfectly without service workers
- These errors don't affect Visual Editing or any Studio functionality
- They're related to optional offline/caching features
- You can safely ignore all service worker-related errors
- If they're distracting, you can filter them out in browser DevTools console filters

**Note**: Service workers are optional features for offline capabilities. Your Sanity Studio works fine without them.

### WebSocket/EventSource Connection Errors

If you see connection errors like:
- "No activity within 45000 milliseconds. No response received. Reconnecting"
- "Failed to establish EventSource connection"

**These are harmless warnings** from Sanity Studio's live updates feature:
- The Studio uses WebSocket and EventSource (SSE) connections for real-time collaboration
- These connections are optional and used for live collaboration features
- The Studio will continue to work perfectly without them
- This does **not** affect Visual Editing, content editing, or any core Studio functionality
- You can safely ignore these messages - they're expected when:
  - Working alone (no active collaboration)
  - Network/firewall blocks the connections
  - The connections timeout due to inactivity
- If they're distracting, you can filter them out in browser DevTools console filters

**Note:** These errors are cosmetic and don't impact your ability to edit content in Sanity Studio.

### Visual Editing Setup

The codebase now includes Visual Editing support following the [official Sanity documentation](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router):

- **Draft Mode API Route**: `/api/draft-mode/enable` - Uses `defineEnableDraftMode` from `next-sanity/draft-mode`
- **Visual Editing Component**: Automatically renders overlays when draft mode is enabled
- **Disable Draft Mode**: Component and server action for disabling draft mode outside Presentation Tool
- **Draft Client Helper**: `getDraftClient()` function for fetching data with stega encoding in draft mode

### Visual Editing Connection Error

If you see "Unable to connect to visual editing":

1. **Verify Environment Variables**: Ensure these are set in `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
   SANITY_VIEWER_TOKEN=your-viewer-token
   ```

2. **Check Studio URL**: The `NEXT_PUBLIC_SANITY_STUDIO_URL` must match where your Studio is accessible:
   - For embedded Studio: `http://localhost:3000/studio`
   - For hosted Studio: `https://your-project.sanity.studio`

3. **Use Draft Client**: When fetching data in server components, use `getDraftClient()` from `@/lib/sanity/draft-client` instead of the regular client to ensure stega encoding:
   ```typescript
   import { getDraftClient } from '@/lib/sanity/draft-client'
   
   const draftClient = await getDraftClient()
   const data = await draftClient.fetch(query)
   ```

4. **Restart Dev Server**: After updating environment variables, restart your Next.js dev server

5. **Check Browser Console**: Look for any CORS or connection errors in the browser console

The setup includes:
- Stega encoding for automatic overlays
- Click-to-edit functionality
- Live content updates in Presentation Tool
- Proper draft/published content switching

### Studio not loading
- Check that environment variables are set correctly
- Ensure Sanity packages are installed: `npm install`
- Verify CORS origins are configured (see above)

### Data not appearing
- Verify your Project ID and Dataset match your Sanity project
- Check that content is published in Sanity Studio
- Ensure queries are correct in `lib/sanity/queries.ts`

### Images not loading
- Verify image URLs are being generated correctly
- Check Next.js image configuration in `next.config.ts`
- Ensure images are uploaded to Sanity

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/js-client)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)

