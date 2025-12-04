/**
 * Debug helper to verify Visual Editing setup
 * Add this temporarily to check if environment variables are set correctly
 */

export function checkVisualEditingSetup() {
  const checks = {
    projectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
    studioUrl: !!process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    viewerToken: !!process.env.SANITY_VIEWER_TOKEN,
  }

  const allPassed = Object.values(checks).every(Boolean)

  if (!allPassed) {
    console.warn('Visual Editing Setup Check:', checks)
    console.warn('Missing environment variables. Please check your .env.local file.')
  }

  return { checks, allPassed }
}

