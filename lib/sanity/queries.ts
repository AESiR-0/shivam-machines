import { groq } from 'next-sanity'

export const heroQuery = groq`*[_type == "hero"][0]{..., _id}`
export const productsQuery = groq`*[_type == "product"] | order(dateAdded desc){..., _id}`
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]`
export const productsByCategoryQuery = groq`*[_type == "product" && category == $category] | order(dateAdded desc)`
export const aboutQuery = groq`*[_type == "about"][0]{..., _id}`
export const footerQuery = groq`*[_type == "footer"][0]{..., _id}`
export const contactQuery = groq`*[_type == "contact"][0]{..., _id}`
export const machineToolCategoriesQuery = groq`*[_type == "machineToolCategory"] | order(order asc){..., _id}`
export const recentlyAddedQuery = groq`*[_type == "recentlyAdded"][0]{
  ...,
  _id,
  machines[]->{
    _id,
    title,
    slug,
    description,
    category,
    specifications,
    features,
    images,
    dateAdded,
    isInStock
  }
}`
export const ctasQuery = groq`*[_type == "cta"] | order(order asc){..., _id}`
export const industriesQuery = groq`*[_type == "industry"] | order(_createdAt desc)`
export const galleryQuery = groq`*[_type == "gallery"] | order(_createdAt desc)`

