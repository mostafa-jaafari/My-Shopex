import { unstable_cache } from 'next/cache'
import { SupabaseCacheClient_Server } from '@/lib/supabase/SupabaseCacheClient-Server'


const PRODUCT_FIELDS = `
  id,
  name,
  slug,
  price,
  image_url,
  category
`

async function fetchProductsFromSupabase(page: number, limit: number = 15) {
    const supabase = SupabaseCacheClient_Server();
  
    const from = (page - 1) * limit
    const to = from + limit - 1
    const { data, count, error } = await supabase
        .from('listed_products')
        .select(PRODUCT_FIELDS, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

    if (error) {
        console.error('Supabase Error:', error)
        return { data: [], count: 0 }
    }

    return { data, count }
}

export const getProducts = unstable_cache(
  fetchProductsFromSupabase,
  ['products-grid'],
  {
    revalidate: 1,
    tags: ['products']
  }
)