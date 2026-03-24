import { groq } from 'next-sanity'

export const heroQuery = groq`*[_type == "hero"][0]{..., _id}`
export const productsQuery = groq`*[_type == "product"] | order(dateAdded desc){..., _id, category->{name, "slug": slug.current}}`
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{..., _id, category->{name, "slug": slug.current}}`
export const relatedProductsQuery = groq`*[_type == "product" && category->slug.current == $category && slug.current != $currentSlug] | order(dateAdded desc)[0...4]{..., _id, category->{name, "slug": slug.current}}`
export const productsByCategoryQuery = groq`*[_type == "product" && category->slug.current == $category] | order(dateAdded desc){..., _id, category->{name, "slug": slug.current}}`
export const aboutQuery = groq`*[_type == "about"][0]{..., _id}`
export const footerQuery = groq`*[_type == "footer"][0]{..., _id}`
export const contactQuery = groq`*[_type == "contact"][0]{..., _id}`
export const machineToolCategoriesQuery = groq`*[_type == "machineToolCategory"] | order(order asc){..., _id}`
export const recentlyAddedQuery = groq`{
  "section": *[_type == "recentlyAdded"][0]{
    title,
    titleHighlight,
    description,
    _id
  },
  "machines": *[_type == "product"] | order(dateAdded desc)[0...10]{
    _id,
    title,
    slug,
    description,
    "category": category->{name, "slug": slug.current},
    subcategory,
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

