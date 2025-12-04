import { getDraftClient } from '@/lib/sanity/draft-client'
import { productsQuery, ctasQuery } from '@/lib/sanity/queries'
import type { Product, CTA } from '@/lib/sanity/types'
import ProductsClient from './products-client'

export default async function ProductsSection() {
  try {
    const draftClient = await getDraftClient()
    const [products, ctas] = await Promise.all([
      draftClient.fetch<Product[]>(productsQuery).catch(() => []),
      draftClient.fetch<CTA[]>(ctasQuery).catch(() => []),
    ])
    return <ProductsClient products={products} cta={ctas[0]} />
  } catch (error) {
    console.error('Error fetching products data:', error)
    return <ProductsClient products={[]} cta={null} />
  }
}

