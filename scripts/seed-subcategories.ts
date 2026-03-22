import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't5ek8ov6'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-07-11',
})

const MAPPING = [
  { title: "W 75", subcategory: "Table - diameter of spindle to 90 mm" },
  { title: "AFP 180", subcategory: "H - floor type" },
  { title: "DS 12 NC", subcategory: "Single Column" },
  { title: "SR 2000x8", subcategory: "Centre to diameter over 800 mm" },
  { title: "SL-154SY", subcategory: "Automatic" },
  { title: "MA 600 H II", subcategory: "Vertical" },
  { title: "W 100 A", subcategory: "Table - diameter of spindle over 90 mm" },
  { title: "DRTS3100", subcategory: "Rotary Table" },
  { title: "SN 320/750", subcategory: "Centre to diameter 800 mm" },
  { title: "H 40", subcategory: "Horizontal" },
  { title: "1525 CNC", subcategory: "Double Column" },
  { title: "NEF  400", subcategory: "CNC - diameter up to 800 mm" },
  { title: "SNG 1600x10000", subcategory: "CNC - diameter over 800 mm" },
  { title: "GLS- 200Y", subcategory: "CNC multi axis" },
];

async function seedSubcategories() {
  console.log('🌱 Seeding subcategories...')
  try {
    const products = await client.fetch('*[_type == "product"]{_id, title}')
    
    for (const mapping of MAPPING) {
      const product = products.find((p: any) => p.title.replace(/\s+/g, ' ').trim() === mapping.title.replace(/\s+/g, ' ').trim())
      if (product) {
        console.log(`✅ Updating "${product.title}" with subcategory: ${mapping.subcategory}`)
        await client
          .patch(product._id)
          .set({ subcategory: mapping.subcategory })
          .commit()
      } else {
        console.warn(`⚠️ Could not find product with title: "${mapping.title}"`)
      }
    }
    console.log('✨ Seeding completed!')
  } catch (error: any) {
    console.error('❌ Error seeding subcategories:', error.message)
  }
}

seedSubcategories()
