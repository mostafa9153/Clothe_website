"use server";

import { getMockProducts, getMockCategories } from "@/lib/data/mock-db";
import { Product, Category } from "@/types/database.types";

export interface PredictiveSearchResult {
  products: Product[];
  categories: Category[];
  query: string;
}

export async function predictiveSearchAction(query: string): Promise<PredictiveSearchResult> {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) {
    return { products: [], categories: [], query: "" };
  }

  // 1. Fetch matching categories
  const allCategories = getMockCategories();
  const matchingCategories = allCategories.filter((cat) =>
    cat.name.toLowerCase().includes(cleanQuery) ||
    cat.slug.toLowerCase().includes(cleanQuery)
  );

  // 2. Fetch top 6 matching products with images, price, etc.
  const productRes = getMockProducts({
    search: cleanQuery,
    limit: 6,
  });

  return {
    products: productRes.products,
    categories: matchingCategories,
    query: cleanQuery,
  };
}
