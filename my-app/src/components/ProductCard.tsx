"use client";

import { ProductType } from "@/GlobalTypes";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight, BiHeart } from "react-icons/bi";
import { useAddToFavorite } from "@/context/AddToFavoriteContext";
import { FaHeart } from "react-icons/fa6";

const MotionLink = motion(Link);

export const ProductCard = ({ product }: { product: ProductType }) => {
    const { isFavorite, toggleFavorite } = useAddToFavorite();
    const IsFavorite = isFavorite(product.id)
    const [currentImage, setCurrentImage] = useState(0);
    const Group_Slider: string[] = [product.image_url, ...(product.images_slider || [])];
    return (
        <div
            className="w-full max-w-100 min-h-60"
        >
            <MotionLink
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                href={`/${product.id}`}
            >
                <div
                    dir="ltr"
                    className="relative group w-full h-50 rounded-lg overflow-hidden bg-neutral-200 flex items-center justify-between"
                >
                    {Group_Slider.length > 1 && (
                        <div className="absolute z-50 bottom-2 left-1/2 -translate-x-2 bg-black/50 text-white text-xs px-1 rounded">
                            {currentImage + 1}/{Group_Slider.length}
                        </div>
                    )}
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={Group_Slider[currentImage] || product.image_url}
                            alt={product.title}
                            fill
                            className="object-cover object-center"
                        />
                    </motion.div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImage((prev) => (prev - 1 + Group_Slider.length) % Group_Slider.length);
                    }} className="opacity-0 group-hover:opacity-100 absolute left-3 cursor-pointer primary-bg p-0.5 rounded-full">
                        <BiChevronLeft size={24} className="shrink-0"/>
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImage((prev) => (prev + 1) % Group_Slider.length);
                    }} className="opacity-0 group-hover:opacity-100 absolute right-3 cursor-pointer primary-bg p-0.5 rounded-full">
                        <BiChevronRight size={24} className="shrink-0"/>
                    </button>
                </div>
            </MotionLink>
            <div className="space-y-1.5 p-1.5">

                <span className="w-full flex items-start justify-between gap-1.5">
                    <h1 
                        dir={product.isArabic ? "ltr" : "rtl"} 
                        className="primary-text font-bold text-sm">
                        {product.title.length > 50 ? product.title.slice(0, 50) + "..." : product.title}
                    </h1>
                    <button
                        onClick={() => toggleFavorite({
                            id: product.id,
                            title: product.title,
                            price: product.sale_price,
                            image: product.image_url,
                        })}
                    >
                        {IsFavorite ?
                            <FaHeart size={22} className="cursor-pointer primary-text shrink-0"/>
                        :
                            <BiHeart size={22} className="cursor-pointer primary-text shrink-0"/>
                        }
                    </button>
                </span>
                <div>
                    {product.colors.length > 0 && (
                        <div className="flex items-center gap-1.5">
                            {product.colors.slice(0, 3).map((color, index) => (
                                <span
                                    key={index}
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                            {product.colors.length > 3 && (
                                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                            )}
                        </div>
                    )}
                </div>
                <span className="text-sm font-semibold primary-text">
                    {product.sale_price.toLocaleString()} د.م
                    {product.regular_price && (
                        <span className="text-xs text-gray-400 line-through mr-2">
                            {product.regular_price.toLocaleString()} د.م
                        </span>
                    )}
                </span>
            </div>
        </div>
    )
}