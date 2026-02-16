export type ReviewType = {
  user: string
  comment: string
  rating: number
}

export type ProductType = {
  id: string
  isArabic: boolean
  title: string
  sizes: string[]                    // مقاسات المنتج (مثلاً: S, M, L, XL)
  colors: string[]                   // ألوان المنتج (مثلاً: أحمر، أزرق، أسود)
  slug: string
  sale_price: number
  regular_price: number
  image_url: string
  category: string
  created_at: string
  images_slider: string[]          // روابط الصور الإضافية
  reviews: ReviewType[]            // مصفوفة المراجعات
  stock: number                    // عدد القطع المتوفرة
  description: string              // وصف المنتج
}