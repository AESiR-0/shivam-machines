import { draftMode } from 'next/headers'
import { client } from './client'

export async function getDraftClient() {
  const { isEnabled } = await draftMode()
  
  if (isEnabled) {
     return client.withConfig({
      perspective: 'drafts',
      useCdn: false,
    })
  }
  
  return client
}

