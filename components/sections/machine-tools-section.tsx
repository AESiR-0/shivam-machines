import { getDraftClient } from '@/lib/sanity/draft-client'
import { machineToolCategoriesQuery } from '@/lib/sanity/queries'
import type { MachineToolCategory } from '@/lib/sanity/types'
import MachineToolsClient from './machine-tools-client'

export default async function MachineToolsSection() {
  try {
    const draftClient = await getDraftClient()
    const categories = await draftClient.fetch<MachineToolCategory[]>(machineToolCategoriesQuery)
    return <MachineToolsClient categories={categories} />
  } catch (error) {
    console.error('Error fetching machine tool categories:', error)
    return <MachineToolsClient categories={[]} />
  }
}

