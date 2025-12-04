import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemas'
import { locations } from './lib/presentation/resolve'

export default defineConfig({
  name: 'default',
  title: 'Shivam Enterprise',

  projectId: 't5ek8ov6',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      resolve: {
        locations,
      },
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000',
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

