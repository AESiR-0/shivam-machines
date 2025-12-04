import { createClient } from 'next-sanity'
import { dataset, projectId, apiVersion } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion || '2024-12-01',
  useCdn: true,
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3000/studio',
  },
})

