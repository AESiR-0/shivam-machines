# Sanity CMS Implementation Guide

## ✅ What's Been Set Up

### 1. Sanity Packages Installed
- `@sanity/client` - Client for fetching data
- `next-sanity` - Next.js integration
- `@sanity/image-url` - Image URL builder
- `sanity` - Sanity Studio

### 2. Configuration Files Created
- `lib/sanity/client.ts` - Sanity client configuration
- `lib/sanity/server.ts` - Server-side client
- `lib/sanity/image.ts` - Image URL helper
- `lib/sanity/queries.ts` - GROQ queries for all content types
- `lib/sanity/fetch.ts` - Data fetching utility
- `lib/sanity/types.ts` - TypeScript types
- `sanity.config.ts` - Sanity Studio configuration

### 3. Content Schemas Created
All content types are now editable in Sanity Studio:

- **Hero** (`sanity/schemas/hero.ts`) - Homepage hero section
- **Product** (`sanity/schemas/product.ts`) - Machine/product listings
- **About** (`sanity/schemas/about.ts`) - About section content
- **Footer** (`sanity/schemas/footer.ts`) - Footer links and info
- **Contact** (`sanity/schemas/contact.ts`) - Contact page info
- **Machine Tool Category** (`sanity/schemas/machineToolCategory.ts`) - Categories
- **Recently Added** (`sanity/schemas/recentlyAdded.ts`) - Recent machines
- **CTA** (`sanity/schemas/cta.ts`) - Call-to-action sections
- **Industry** (`sanity/schemas/industry.ts`) - Industry pages
- **Gallery** (`sanity/schemas/gallery.ts`) - Image galleries

### 4. Sanity Studio
- Accessible at `/studio` route
- Run with `npm run studio` for standalone mode

### 5. Example Implementation
- `components/sections/hero-wrapper.tsx` - Server component wrapper
- `components/sections/hero-client.tsx` - Client component with Sanity integration

## 🚀 Next Steps

### Step 1: Set Up Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-11
SANITY_API_TOKEN=your-token-here
```

### Step 2: Initialize Sanity Project

1. Run `npm run studio` or visit `/studio` in your app
2. Follow the setup wizard to create your Sanity project
3. Or manually create a project at https://www.sanity.io/manage

### Step 3: Add Content

1. Go to Sanity Studio (`/studio`)
2. Start adding content:
   - Create a Hero document
   - Add Products/Machines
   - Configure Footer
   - Add About content
   - etc.

### Step 4: Update Components

For each component you want to make editable:

#### Pattern 1: Server Component (Recommended)

```typescript
// components/sections/about-wrapper.tsx
import { fetchSanityData } from '@/lib/sanity/fetch'
import { aboutQuery } from '@/lib/sanity/queries'
import AboutClient from './about-client'

export default async function About() {
  const aboutData = await fetchSanityData(aboutQuery)
  return <AboutClient data={aboutData} />
}
```

#### Pattern 2: Direct Server Component

```typescript
// components/sections/about.tsx
import { fetchSanityData } from '@/lib/sanity/fetch'
import { aboutQuery } from '@/lib/sanity/queries'

export default async function About() {
  const data = await fetchSanityData(aboutQuery)
  
  return (
    <section>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </section>
  )
}
```

## 📝 Component Migration Checklist

Update these components to use Sanity:

- [ ] `components/sections/hero-carousel.tsx` → Use Hero schema
- [ ] `components/sections/products.tsx` → Use Product schema
- [ ] `components/sections/about.tsx` → Use About schema
- [ ] `components/sections/recently-added.tsx` → Use RecentlyAdded schema
- [ ] `components/sections/machine-tools.tsx` → Use MachineToolCategory schema
- [ ] `components/sections/contact.tsx` → Use Contact schema
- [ ] `components/sections/ctas.tsx` → Use CTA schema
- [ ] `components/layout/footer.tsx` → Use Footer schema
- [ ] `app/products/page.tsx` → Use Product schema
- [ ] `app/gallery/page.tsx` → Use Gallery schema
- [ ] `app/industries/page.tsx` → Use Industry schema

## 🖼️ Using Images from Sanity

```typescript
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'

// In your component
const imageUrl = urlFor(product.images[0])
  .width(800)
  .height(600)
  .url()

<Image src={imageUrl} alt="Product" width={800} height={600} />
```

## 🔍 Querying Data

All queries are in `lib/sanity/queries.ts`. Examples:

```typescript
import { fetchSanityData } from '@/lib/sanity/fetch'
import { productsQuery, productBySlugQuery } from '@/lib/sanity/queries'

// Get all products
const products = await fetchSanityData(productsQuery)

// Get product by slug
const product = await fetchSanityData(productBySlugQuery, { slug: 'my-product' })
```

## 🎨 Sanity Studio Customization

The Studio is configured in `sanity.config.ts`. You can:
- Customize the structure
- Add custom input components
- Configure previews
- Add custom actions

See: https://www.sanity.io/docs/structure-builder

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity](https://www.sanity.io/docs/js-client)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image URLs](https://www.sanity.io/docs/image-urls)

## ⚠️ Important Notes

1. **Fallback Data**: Components should have fallback data if Sanity is not configured
2. **Image Optimization**: Next.js image optimization is configured for Sanity CDN
3. **Type Safety**: Use TypeScript types from `lib/sanity/types.ts`
4. **Error Handling**: Always wrap Sanity fetches in try-catch blocks

## 🐛 Troubleshooting

### Studio not loading
- Check environment variables
- Ensure packages are installed: `npm install`

### Data not appearing
- Verify Project ID and Dataset
- Check content is published (not draft)
- Verify queries are correct

### Images not loading
- Check Next.js image config allows `cdn.sanity.io`
- Verify image URLs are generated correctly
- Check image assets are uploaded to Sanity

