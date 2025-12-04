import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pathname = searchParams.get('sanity-preview-pathname') || '/'

  // Disable draft mode
  const draft = await draftMode()
  draft.disable()

  // Build the redirect URL
  const url = new URL(pathname, request.url)
  
  // Redirect to the pathname
  return NextResponse.redirect(url)
}

