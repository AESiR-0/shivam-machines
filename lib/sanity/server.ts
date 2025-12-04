import { createClient } from '@sanity/client'
import { dataset, projectId, apiVersion } from './env'

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for server-side rendering
  token: process.env.SANITY_API_TOKEN, // Optional, for write operations
})

