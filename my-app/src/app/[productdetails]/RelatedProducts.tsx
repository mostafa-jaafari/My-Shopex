import { ProductCard } from "@/components/ProductCard";
import { getRelatedProducts } from "@/data/getRelatedProducts";
import { ProductType } from "@/GlobalTypes";

export const RelatedProducts = async ({ product }: { product: ProductType }) => {
  // Pass the actual product object to the cached function
  const relatedProducts = await getRelatedProducts(product, 4);

  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div className="mt-6 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {relatedProducts.map((p) => (
            <ProductCard
                product={p}
                key={p.id}
            />
        ))}
      </div>
    </div>
  );
};