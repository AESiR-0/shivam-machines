import { Suspense } from "react";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { productsQuery } from "@/lib/sanity/queries";
import type { Product } from "@/lib/sanity/types";
import ProductsContent from "@/components/products/products-listing-client";

async function ProductsPageContent() {
  try {
    const products = await fetchSanityData<Product[]>(productsQuery);
    return <ProductsContent products={products} />;
  } catch (error) {
    console.error("Error fetching products:", error);
    return <ProductsContent products={[]} />;
  }
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
