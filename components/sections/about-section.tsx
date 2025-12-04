import { getDraftClient } from '@/lib/sanity/draft-client'
import { aboutQuery } from '@/lib/sanity/queries'
import type { About } from '@/lib/sanity/types'
import AboutClient from './about-client'

export default async function AboutSection() {
  try {
    const draftClient = await getDraftClient()
    const aboutData = await draftClient.fetch<About>(aboutQuery)
    return <AboutClient data={aboutData} />
  } catch (error) {
    console.error('Error fetching about data:', error)
    return <AboutClient data={null} />
  }
}

