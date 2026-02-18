"use client";

import { useAddToFavorite } from "@/context/AddToFavoriteContext";
import { ProductType } from "@/GlobalTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";

export const FavoriteProducts = () => {
  const { favoritesIds, isFavorite, toggleFavorite } = useAddToFavorite();
  const [favoritesProducts, setFavoritesProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // flag to prevent empty state before fetch

  useEffect(() => {
    let isMounted = true;

    const fetchFavorites = async () => {
      setIsLoading(true);
      setHasLoaded(false); // start fetch

      if (favoritesIds.length === 0) {
        if (isMounted) {
          setFavoritesProducts([]);
          setIsLoading(false);
          setHasLoaded(true);
        }
        return;
      }

      try {
        const res = await fetch("/api/products-by-ids", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: favoritesIds }),
        });

        const data: ProductType[] = await res.json();
        if (isMounted) setFavoritesProducts(data || []);
      } catch (err) {
        console.error(err);
        if (isMounted) setFavoritesProducts([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setHasLoaded(true); // mark fetch finished
        }
      }
    };

    fetchFavorites();

    return () => {
      isMounted = false;
    };
  }, [favoritesIds]);

  // ---------- RENDER ----------

  if (!hasLoaded || isLoading) {
    return (
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {Array(4).fill(0).map((_, idx) => (
          <div
            key={idx}
            className="w-full"
          >
            <div className="w-full h-60 bg-neutral-200 rounded-lg animate-pulse"/>
            <span className="flex h-6 w-full rounded-full mt-1.5 bg-neutral-200 animate-pulse"/>
            <span className="flex h-6 w-[60%] rounded-full mt-1.5 bg-neutral-200 animate-pulse"/>
          </div>
        ))}
      </div>
    );
  }

  if (favoritesProducts.length === 0) {
    return (
      <div className="w-full pt-12 flex justify-center">
        <h2 className="text-center text-md text-gray-400 mt-12">
          لم تقم بإضافة أي منتج للمفضلة بعد
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 md:p-6">
      {favoritesProducts.map((p) => (
        <div key={p.id} className="max-w-70">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Link
              href={`/${p.id}`}
            >
              <Image
                src={p.image_url}
                alt={p.title}
                fill
                className="object-cover"
              />
            </Link>
            <button
              onClick={() => toggleFavorite(p.id)}
              className="absolute right-2 top-2 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:scale-110 transition"
            >
              {isFavorite(p.id) ? (
                <FaHeart size={22} className="cursor-pointer primary-text shrink-0" />
              ) : (
                <BiHeart size={22} className="cursor-pointer primary-text shrink-0" />
              )}
            </button>
          </div>

          <div className="w-full px-1.5">
            <h2 className="text-sm font-bold mt-2 primary-text">{p.title}</h2>
            <p className="text-md font-semibold text-gray-600">{p.sale_price} د.م</p>
          </div>
        </div>
      ))}
    </div>
  );
};