import { fetchSanityData } from '@/lib/sanity/fetch'
import { heroQuery } from '@/lib/sanity/queries'
import type { Hero } from '@/lib/sanity/types'
import HeroClient from './hero-client'

export default async function Hero() {
  try {
    const heroData = await fetchSanityData<Hero>(heroQuery)
    return <HeroClient data={heroData} />
  } catch (error) {
    console.error('Error fetching hero data:', error)
    // Fallback to default data if Sanity is not configured
    return <HeroClient data={null} />
  }
}

