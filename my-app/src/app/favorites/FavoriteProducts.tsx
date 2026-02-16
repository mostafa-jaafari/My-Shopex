"use client";
import { useAddToFavorite } from "@/context/AddToFavoriteContext";
import Image from "next/image";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";



export const FavoriteProducts = () => {
    const { favorites, isFavorite, toggleFavorite } = useAddToFavorite();
    const IsFavorite = (productID: string) => {
        return isFavorite(productID)
    }

    if(favorites.length > 0){
        return (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 md:p-6">
                {favorites.map((p) => (
                    <div
                        key={p.id}
                        className="max-w-70"
                    >
                        <div
                            className="relative w-full aspect-square rounded-lg overflow-hidden"
                        >
                            <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                className="object-cover"
                            />
                            <button
                                onClick={() => toggleFavorite(p)}
                                className="absolute z-20 p-1.5 border border-neutral-200 bg-white/60 shadow-lg rounded-full right-2 top-2"
                            >
                                {IsFavorite(p.id) ? 
                                    <FaHeart size={22} className="cursor-pointer primary-text shrink-0"/>
                                :
                                    <BiHeart size={22} className="cursor-pointer primary-text shrink-0"/>
                                }
                            </button>
                        </div>

                        <div className="w-full px-1.5">
                            <h2 className="text-sm font-bold mt-2 primary-text">{p.title}</h2>
                            <p className="text-md font-semibold text-gray-600">{p.price} د.م</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div
            className="w-full pt-12 flex justify-center"
        >
            <h2 className="text-center text-md text-gray-400 mt-12">لم تقم بإضافة أي منتج للمفضلة بعد</h2>
        </div>
    )
}