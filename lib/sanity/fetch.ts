import { getDraftClient } from './draft-client'
import type { QueryParams } from 'next-sanity'

/**
 * Fetch data from Sanity with automatic draft mode and stega encoding support
 * Use this utility function for Visual Editing compatibility
 */
export async function fetchSanityData<T = any>(
  query: string,
  params?: QueryParams
): Promise<T> {
  const draftClient = await getDraftClient()
  if (params) {
    return draftClient.fetch<T>(query, params)
  }
  return draftClient.fetch<T>(query)
}

