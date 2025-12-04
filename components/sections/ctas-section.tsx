import { getDraftClient } from '@/lib/sanity/draft-client'
import { ctasQuery } from '@/lib/sanity/queries'
import type { CTA } from '@/lib/sanity/types'
import CTAsClient from './ctas-client'

export default async function CTAsSection() {
  try {
    const draftClient = await getDraftClient()
    const ctas = await draftClient.fetch<CTA[]>(ctasQuery)
    return <CTAsClient ctas={ctas} />
  } catch (error) {
    console.error('Error fetching CTAs data:', error)
    return <CTAsClient ctas={[]} />
  }
}

