import { defineCliConfig } from 'sanity/cli'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})

