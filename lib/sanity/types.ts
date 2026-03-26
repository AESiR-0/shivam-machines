import type { SanityImageSource } from '@sanity/image-url'

export interface Hero {
  badge?: string
  title: string
  titleHighlight?: string
  titleSuffix?: string
  description: string
  features?: string[]
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  stats?: Array<{
    label: string
    value: string
  }>
  heroImage?: SanityImageSource
}

export interface Product {
  _id: string
  title: string
  slug: { current: string }
  description: string
  specifications?: string
  category: {
    name: string
    slug: string
  }
  subcategory?: string
  features?: string[]
  images?: SanityImageSource[]
  isInStock?: boolean
  dateAdded?: string
  price?: string
  year?: number
  condition?: string
  technicalSpecs?: {
    [key: string]: string | number | undefined
  }
}

export interface About {
  heroBadge?: string
  heroTitle?: string
  heroDescription?: string
  highlights?: Array<{
    value: string
    label: string
  }>
  journeyTitle?: string
  journeySubtitle?: string
  timeline?: Array<{
    title: string
    body: string
  }>
  aboutSectionTitle?: string
  description?: string
  stats?: Array<{
    icon?: string
    title: string
    description?: string
    value: string
    color?: string
  }>
  features?: Array<{
    title: string
    description?: string
  }>
}

export interface Footer {
  companyName?: string
  description?: string
  phone?: string
  email?: string
  address?: string
  companyLinks?: Array<{ name: string; href: string }>
  productLinks?: Array<{ name: string; href: string }>
  serviceLinks?: Array<{ name: string; href: string }>
  supportLinks?: Array<{ name: string; href: string }>
  socialLinks?: Array<{ platform: string; url: string }>
}

export interface Contact {
  heroTitle?: string
  heroDescription?: string
  title?: string
  contactInfo?: Array<{
    type: string
    title: string
    details: string[]
    color?: string
  }>
  stats?: Array<{
    value: string
    label: string
  }>
}

export interface MachineToolCategory {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  icon?: string
  count?: string
  href?: string
  color?: string
  order?: number
  image?: SanityImageSource
}

export interface RecentlyAdded {
  title?: string
  titleHighlight?: string
  description?: string
  machines?: Product[]
}

export interface CTA {
  _id: string
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  order?: number
}

export interface Industry {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  image?: SanityImageSource
  stats?: string
  applications?: string[]
  machines?: Product[]
}

export interface Gallery {
  _id: string
  title?: string
  images?: Array<{
    _key: string
    asset: SanityImageSource
    alt?: string
    caption?: string
  }>
  category?: string
}

