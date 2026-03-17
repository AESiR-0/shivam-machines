import { Suspense } from "react";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { productsQuery, machineToolCategoriesQuery } from "@/lib/sanity/queries";
import type { Product, MachineToolCategory } from "@/lib/sanity/types";
import ProductsContent from "@/components/products/products-listing-client";

async function ProductsPageContent() {
  try {
    const products = await fetchSanityData<Product[]>(productsQuery);
    const categories = await fetchSanityData<MachineToolCategory[]>(machineToolCategoriesQuery);
    return <ProductsContent products={products} categories={categories || []} />;
  } catch (error) {
    console.error("Error fetching products:", error);
    return <ProductsContent products={[]} categories={[]} />;
  }
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
