import { getDraftClient } from '@/lib/sanity/draft-client'
import { recentlyAddedQuery } from '@/lib/sanity/queries'
import type { RecentlyAdded } from '@/lib/sanity/types'
import RecentlyAddedClient from './recently-added-client'

export default async function RecentlyAddedSection() {
  try {
    const draftClient = await getDraftClient()
    const recentlyAddedData = await draftClient.fetch<RecentlyAdded>(recentlyAddedQuery)
    return <RecentlyAddedClient data={recentlyAddedData} />
  } catch (error) {
    console.error('Error fetching recently added data:', error)
    return <RecentlyAddedClient data={null} />
  }
}

