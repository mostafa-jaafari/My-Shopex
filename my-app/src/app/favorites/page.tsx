import { FavoriteProducts } from "./FavoriteProducts";


export const dynamic = 'force-static';
export default async function FavoritesPage() {
  return (
    <div className="min-h-125 w-full flex flex-col items-start gap-12 pt-6 justify-start px-6 md:px-12">
      <h1 className="text-3xl font-bold primary-text">صفحة المفضلة</h1>
      <FavoriteProducts />
    </div>
  )
}