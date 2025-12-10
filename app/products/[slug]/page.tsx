import { notFound } from 'next/navigation'
import { fetchSanityData } from '@/lib/sanity/fetch'
import { productBySlugQuery, relatedProductsQuery } from '@/lib/sanity/queries'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import WhatsAppButton from '@/components/ui/whatsapp-button'
import ProductImageGallery from '@/components/products/product-image-gallery'
import ProductInfo from '@/components/products/product-info'
import ProductSpecifications from '@/components/products/product-specifications'
import RelatedProducts from '@/components/products/related-products'
import type { Product } from '@/lib/sanity/types'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await fetchSanityData<Product | null>(productBySlugQuery, { slug })

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.title} | Shivam Enterprise`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await fetchSanityData<Product | null>(productBySlugQuery, { slug })

  if (!product) {
    notFound()
  }

  // Fetch related products
  const relatedProducts = await fetchSanityData<Product[]>(
    relatedProductsQuery,
    {
      category: product.category,
      currentSlug: slug,
    }
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-brand-lightGray">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-brand-gray">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="hover:text-brand-darkBlue transition-colors">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/products" className="hover:text-brand-darkBlue transition-colors">
                Products
              </a>
            </li>
            <li>/</li>
            <li className="text-brand-darkBlue font-medium">{product.title}</li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Gallery */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <ProductImageGallery images={product.images || []} title={product.title} />
            </div>

            {/* Product Info */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>

        {/* Specifications and Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Specifications */}
          {product.specifications && (
            <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <ProductSpecifications specifications={product.specifications} />
            </div>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 font-candara">
                Key Features
              </h2>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-brand-orange/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg
                        className="w-4 h-4 text-brand-orange"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-brand-gray font-nunito leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 mb-8">
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-4 font-candara">
              Product Description
            </h2>
            <div className="prose max-w-none">
              <p className="text-brand-gray font-nunito leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} currentSlug={slug} />
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}

