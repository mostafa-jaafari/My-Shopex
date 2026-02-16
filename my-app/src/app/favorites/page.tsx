import { FavoriteProducts } from "./FavoriteProducts";




export const dynamic = 'force-static';
export default function FavoritesPage() {
  return (
    <div className="min-h-125 w-full flex flex-col items-center pt-6 justify-start">
      <h1 className="text-3xl font-bold primary-text">صفحة المفضلة</h1>
      <FavoriteProducts />
    </div>
  )
}