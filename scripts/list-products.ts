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

async function listProducts() {
  try {
    const products = await client.fetch('*[_type == "product"]{_id, title, category, subcategory}')
    console.log(JSON.stringify(products, null, 2))
  } catch (error: any) {
    console.error('Error fetching products:', error.message)
  }
}

listProducts()
