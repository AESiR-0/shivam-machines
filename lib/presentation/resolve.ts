import { defineLocations } from 'sanity/presentation'

// Resolve locations for Presentation Tool
// This maps Sanity documents to frontend routes
export const locations = {
  // Hero document
  hero: defineLocations({
    select: {
      title: 'title',
    },
    resolve: (doc) => {
      if (!doc) return { locations: [] }
      return {
        locations: [
          {
            title: doc.title || 'Hero',
            href: '/',
          },
        ],
      }
    },
  }),

  // Product documents
  product: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => {
      if (!doc) return { locations: [] }
      const locations = []
      
      // Add homepage location (products are shown on homepage)
      locations.push({
        title: doc.title || 'Product',
        href: '/',
      })
      
      // Add product detail page if slug exists
      if (doc.slug) {
        locations.push({
          title: doc.title || 'Product',
          href: `/products/${doc.slug}`,
        })
      }
      
      return { locations }
    },
  }),

  // About document
  about: defineLocations({
    select: {
      title: 'title',
    },
    resolve: (doc) => {
      if (!doc) return { locations: [] }
      return {
        locations: [
          {
            title: doc.title || 'About',
            href: '/',
          },
        ],
      }
    },
  }),

  // CTA documents
  cta: defineLocations({
    select: {
      title: 'title',
    },
    resolve: (doc) => {
      if (!doc) return { locations: [] }
      return {
        locations: [
          {
            title: doc.title || 'CTA',
            href: '/',
          },
        ],
      }
    },
  }),

  // Footer document
  footer: defineLocations({
    select: {
      title: 'companyName',
      companyName: 'companyName',
    },
    resolve: (doc) => {
      if (!doc) return { locations: [] }
      return {
        locations: [
          {
            title: (doc as any).companyName || (doc as any).title || 'Footer',
            href: '/',
          },
        ],
      }
    },
  }),

  // Machine Tool Category documents
  machineToolCategory: defineLocations({
    select: {
      title: 'title',
    },
    resolve: (doc) => {
      if (!doc) return { locations: [] }
      return {
        locations: [
          {
            title: doc.title || 'Category',
            href: '/',
          },
        ],
      }
    },
  }),

  // Recently Added document
  recentlyAdded: defineLocations({
    select: {
      title: 'title',
    },
    resolve: (doc) => {
      if (!doc) return { locations: [] }
      return {
        locations: [
          {
            title: doc.title || 'Recently Added',
            href: '/',
          },
        ],
      }
    },
  }),
}

