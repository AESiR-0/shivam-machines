import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't5ek8ov6'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ Error: SANITY_API_TOKEN is not set in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-07-11',
})

const FERMAT_CATEGORIES = [
  "Borers horizontal",
  "Machining centres",
  "Vertical Lathes",
  "Lathes",
  "Grinding machines",
  "Milling machines",
  "Cutting equipments",
  "Press brakes",
  "Press",
  "Gear machinery",
  "Bending machines",
  "Bending roll machines",
  "Shears",
  "Boring and drilling machines",
  "Miscellaneous",
  "Accessories to machines"
];

async function cleanupCategories() {
  console.log('🧹 Cleaning up Sanity Categories...')
  
  try {
    // Fetch all current machine tool categories
    const allCategories = await client.fetch('*[_type == "machineToolCategory"]')
    console.log(`📊 Found ${allCategories.length} categories in Sanity.`)

    const fermatLower = FERMAT_CATEGORIES.map(n => n.toLowerCase());

    for (const cat of allCategories) {
      if (!fermatLower.includes(cat.name.toLowerCase())) {
        console.log(`  🗑️  Deleting: ${cat.name} (Not in Fermat list)`)
        await client.delete(cat._id)
      }
    }

    console.log('\n✨ Cleanup finished!')
  } catch (error: any) {
    console.error('❌ Error during cleanup:', error.message)
  }
}

cleanupCategories()
