import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { checkVisualEditingSetup } from "@/lib/sanity/visual-editing-debug";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shivam Enterprise - Premium Industrial Machinery Solutions",
    template: "%s | Shivam Enterprise"
  },
  description: "Leading supplier of premium used machine tools since 1997. We deliver precision, reliability, and innovation to industries across India with our extensive inventory and expert service.",
  keywords: [
    "industrial machinery",
    "used machine tools",
    "boring machines",
    "lathe machines",
    "gear machines",
    "CNC machines",
    "manufacturing equipment",
    "machine tools India",
    "Shivam Enterprise"
  ],
  authors: [{ name: "Shivam Enterprise" }],
  creator: "Shivam Enterprise",
  publisher: "Shivam Enterprise",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://shivammachines.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shivammachines.in",
    title: "Shivam Enterprise - Premium Industrial Machinery Solutions",
    description: "Leading supplier of premium used machine tools since 1997. We deliver precision, reliability, and innovation to industries across India.",
    siteName: "Shivam Enterprise",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shivam Enterprise - Industrial Machinery Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Enterprise - Premium Industrial Machinery Solutions",
    description: "Leading supplier of premium used machine tools since 1997. We deliver precision, reliability, and innovation to industries across India.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draftModeStatus = await draftMode()
  const isDraftModeEnabled = draftModeStatus.isEnabled

  // Debug: Check Visual Editing setup when draft mode is enabled
  if (isDraftModeEnabled && process.env.NODE_ENV === 'development') {
    checkVisualEditingSetup()
  }

  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {isDraftModeEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
