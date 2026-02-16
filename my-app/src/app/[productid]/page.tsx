import { getProductById } from '@/data/getProductBySlug'
import { notFound } from 'next/navigation'
import { Suspense } from 'react' // Import Suspense
import { DisplayProduct } from './DisplayProduct'
import { RelatedProducts } from './RelatedProducts'
import { ProductDetails } from './ProductDetails'

interface PageProps {
  params: Promise<{ productid: string }>
}

// 1. Generate SEO Metadata
export async function generateMetadata({ params }: PageProps) {
  const { productid } = await params
  const product = await getProductById(productid)

  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.title}`,
    description: `Buy ${product.title} for only ${product.sale_price} Dh`,
    openGraph: {
      images: [product.image_url],
    },
  }
}

export default async function SingleProductPage({ params }: PageProps) {
  const { productid } = await params 
  
  // 2. Fetch Main Product Data
  const product = await getProductById(productid)

  if (!product) {
    return notFound()
  }

  return (
    <div className='min-h-screen w-full pb-20'>
      <div
        dir='ltr' 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-12 py-3 md:py-8 max-w-7xl mx-auto"
      >
        <DisplayProduct 
          Product_ImageUrl={product.image_url}
          Product_Title={product.title}
          Product_Sliders={product.images_slider}
        />
        <ProductDetails product={product} />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className='w-full flex items-center gap-3'>
          <span className='flex grow h-px bg-[#a17e33]/40 my-8'/>
          <h2 className="text-nowrap text-xl md:text-2xl font-bold primary-text">منتجات ذات صلة</h2>
          <span className='flex grow h-px bg-[#a17e33]/40 my-8'/>
        </div>
        
        {/* 
           3. Suspense Boundary 
           This allows the page to render the main product immediately, 
           showing a skeleton or loading state while related products fetch.
        */}
        <Suspense fallback={<RelatedProductsSkeleton />}>
           <RelatedProducts product={product} />
        </Suspense>
      </div>
    </div>
   )
}

// Optional: A simple loading skeleton for better UX
function RelatedProductsSkeleton() {
  return (
    <div className="mt-12 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
           <div key={i} className="h-60 bg-gray-200 rounded-md"></div>
        ))}
      </div>
    </div>
  )
}