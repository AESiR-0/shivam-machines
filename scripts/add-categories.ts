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

async function addCategories() {
  console.log('🌱 Adding Categories to Sanity...')
  
  for (const [index, name] of FERMAT_CATEGORIES.entries()) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const category = {
      _type: 'machineToolCategory',
      _id: `category-${slug}`,
      name: name,
      slug: { _type: 'slug', current: slug },
      description: `Premium ${name} for industrial applications.`,
      icon: 'Settings',
      count: '0 Machines',
      href: `/products?category=${slug}`,
      color: 'from-gray-500 to-gray-600',
      order: index + 1,
    }

    try {
      // Use createIfNotExists to avoid overwriting existing categories that might have images/descriptions
      await client.createIfNotExists(category)
      console.log(`  ✅ Handled: ${name}`)
    } catch (error: any) {
      console.error(`  ❌ Error adding ${name}:`, error.message)
    }
  }
  
  console.log('\n🎉 Finished updating categories!')
}

addCategories()
