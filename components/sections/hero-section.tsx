import { getDraftClient } from '@/lib/sanity/draft-client'
import { heroQuery, productsQuery } from '@/lib/sanity/queries'
import type { Hero, Product } from '@/lib/sanity/types'
import HeroCarouselClient from './hero-carousel-client'

export default async function HeroSection() {
  try {
    const draftClient = await getDraftClient()
    const [heroData, products] = await Promise.all([
      draftClient.fetch<Hero>(heroQuery).catch(() => null),
      draftClient.fetch<Product[]>(productsQuery).catch(() => []),
    ])
    return <HeroCarouselClient data={heroData} products={products} />
  } catch (error) {
    console.error('Error fetching hero data:', error)
    return <HeroCarouselClient data={null} products={[]} />
  }
}

