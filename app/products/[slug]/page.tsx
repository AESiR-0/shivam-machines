import { notFound } from 'next/navigation'
import { fetchSanityData } from '@/lib/sanity/fetch'
import { productBySlugQuery } from '@/lib/sanity/queries'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import WhatsAppButton from '@/components/ui/whatsapp-button'
import ProductImageGallery from '@/components/products/product-image-gallery'
import ProductInfo from '@/components/products/product-info'
import ProductSpecifications from '@/components/products/product-specifications'
import ProductSpecsTable from '@/components/products/product-specs-table'
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-brand-lightGray">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductImageGallery images={product.images || []} title={product.title} />
            </div>

            {/* Product Info */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>

        {/* Specifications */}
        {(product.technicalSpecs || product.specifications) && (
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 mb-8">
            {product.technicalSpecs && (
              <ProductSpecsTable technicalSpecs={product.technicalSpecs} />
            )}
            {product.specifications && (
              <ProductSpecifications specifications={product.specifications} />
            )}
          </div>
        )}

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
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}

