import { notFound } from "next/navigation";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { productBySlugQuery } from "@/lib/sanity/queries";
import ProductImageGallery from "@/components/products/product-image-gallery";
import ProductInfo from "@/components/products/product-info";
import ProductSpecifications from "@/components/products/product-specifications";
import ProductSpecsTable from "@/components/products/product-specs-table";
import type { Product } from "@/lib/sanity/types";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchSanityData<Product | null>(productBySlugQuery, {
    slug,
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | Shivam Enterprise`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchSanityData<Product | null>(productBySlugQuery, {
    slug,
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-brand-lightGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12">
        {/* Back Button */}
        <div>
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-semibold text-brand-darkGray hover:text-brand-orange transition-colors group px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to All Products
          </Link>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Gallery (Sticky) */}
            <div className="lg:sticky lg:top-28 lg:self-start h-fit min-w-0">
              <ProductImageGallery
                images={product.images || []}
                title={product.title}
              />
            </div>

            {/* Product Info & Specifications */}
            <div className="space-y-8 min-w-0">
              <ProductInfo product={product} />

              {/* Relocated Technical Specifications */}
              {(product.technicalSpecs || product.specifications) && (
                <div className="md:pt-8 pt-2  border-t border-gray-100">
                  {product.technicalSpecs && (
                    <ProductSpecsTable
                      technicalSpecs={product.technicalSpecs}
                    />
                  )}
                  {product.specifications && (
                    <div className="mt-4">
                      <ProductSpecifications
                        specifications={product.specifications}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
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
      </div>
    </main>
  );
}
