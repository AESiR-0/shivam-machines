import { NextResponse } from "next/server";
import { createImageUrlBuilder } from "@sanity/image-url";
import { productsQuery } from "@/lib/sanity/queries";
import { dataset, projectId } from "@/lib/sanity/env";
import { serverClient } from "@/lib/sanity/server";
import type { Product } from "@/lib/sanity/types";

export const dynamic = "force-dynamic";

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
});

export async function GET() {
  try {
    const products = await serverClient.fetch<Product[]>(productsQuery);

    const catalogProducts = products.map((product) => ({
      id: product._id,
      title: product.title,
      category: product.category,
      imageUrl: product.images?.[0]
        ? imageBuilder.image(product.images[0]).width(1200).height(900).fit("max").auto("format").url()
        : undefined,
      specifications: product.specifications,
      description: product.description,
      features: product.features,
      technicalSpecs: product.technicalSpecs,
      price: product.price,
      year: product.year,
      condition: product.condition,
      isInStock: product.isInStock,
    }));

    return NextResponse.json({
      products: catalogProducts,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load catalog products" },
      { status: 500 }
    );
  }
}
