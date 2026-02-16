import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { SupabaseCacheClient_Server } from '@/lib/supabase/SupabaseCacheClient-Server'
import { ProductType } from '@/GlobalTypes'

// 1. Removed 'description' because it doesn't exist in your DB yet
const PRODUCT_DETAIL_FIELDS = `
  id,
  title,
  description,
  sizes,
  colors,
  slug,
  sale_price,
  regular_price,
  image_url,
  category,
  created_at,
  images_slider,
  isArabic,
  reviews
`

async function fetchProductFromSupabase(productID: string) {
  const supabase = SupabaseCacheClient_Server()
  
  // 2. Changed table name from 'products' to 'listed_products'
  const { data, error } = await supabase
    .from('listed_products') 
    .select(PRODUCT_DETAIL_FIELDS)
    .eq('id', productID)
    .single()

  if (error) {
    // Log error but return null so the page can show a 404
    console.error(`Error fetching product ${productID}:`, error.message)
    return null
  }

  return data as ProductType;
}

export const getProductById = cache(async (productID: string) => {
  const getCachedProduct = unstable_cache(
    async () => fetchProductFromSupabase(productID),
    [`product-details-${productID}`], 
    {
      revalidate: 1, 
      tags: [`product-${productID}`] 
    }
  )

  return getCachedProduct()
})