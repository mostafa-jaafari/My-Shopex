import { ProductType } from "@/GlobalTypes";
import { SupabaseCacheClient_Server } from "@/lib/supabase/SupabaseCacheClient-Server";
import { unstable_cache } from "next/cache";

export const getRelatedProducts = unstable_cache(
  async (currentProduct: ProductType, limit: number = 4): Promise<ProductType[]> => {
    const supabase = SupabaseCacheClient_Server();
    
    // Select only needed fields to reduce payload size
    const selectFields = "id, title, image_url, images_slider, sale_price, regular_price, category, colors";

    // 1️⃣ Fetch by Category
    const { data: byCategory } = await supabase
      .from("listed_products")
      .select(selectFields)
      .eq("category", currentProduct.category)
      .neq("id", currentProduct.id) // Exclude current product
      .limit(limit);

    const relatedByCategory = (byCategory as ProductType[]) || [];

    // If we have enough, return immediately
    if (relatedByCategory.length >= limit) {
      return relatedByCategory;
    }

    // 2️⃣ Fetch by Colors (Filling the gap)
    const remaining = limit - relatedByCategory.length;
    
    // Create a list of IDs to exclude (current product + ones already found by category)
    const excludedIds = [currentProduct.id, ...relatedByCategory.map((p) => p.id)];

    const { data: byColor } = await supabase
      .from("listed_products")
      .select(selectFields)
      .not("id", "in", `(${excludedIds.join(",")})`) // Efficiently exclude existing
      .contains("colors", currentProduct.colors) // Assuming colors is JSONB array
      .limit(remaining);

    const relatedByColor = (byColor as ProductType[]) || [];

    return [...relatedByCategory, ...relatedByColor];
  },
  ["related-products-logic"], // Base cache key
  {
    revalidate: 3600 * 5, // 5 Hours
  }
);