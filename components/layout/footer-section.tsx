import { getDraftClient } from '@/lib/sanity/draft-client'
import { footerQuery } from '@/lib/sanity/queries'
import type { Footer } from '@/lib/sanity/types'
import FooterClient from './footer-client'

export default async function FooterSection() {
  try {
    const draftClient = await getDraftClient()
    const footerData = await draftClient.fetch<Footer>(footerQuery)
    return <FooterClient data={footerData} />
  } catch (error) {
    console.error('Error fetching footer data:', error)
    return <FooterClient data={null} />
  }
}

