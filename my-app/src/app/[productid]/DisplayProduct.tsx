"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const DisplayProduct = ({ Product_ImageUrl, Product_Sliders, Product_Title }: { Product_ImageUrl: string; Product_Sliders: string[]; Product_Title: string }) => {
    const [currentImage, setCurrentImage] = useState(Product_ImageUrl)
    const [isShowMore, setIsShowMore] = useState(false)
    const ShowMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ShowMoreRef.current && !ShowMoreRef.current.contains(event.target as Node)) {
                setIsShowMore(false)
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    },[])
    
    const PRODUCT_SLIDERS = [...Product_Sliders, Product_ImageUrl];
    return (
        <div
            ref={ShowMoreRef}
            className='relative lg:sticky lg:top-20 w-full max-w-140 grid grid-cols-7 bg-white h-max gap-1'
        >
            <div
                className='relative col-span-7 md:col-span-6 w-full max-w-130 h-full max-h-130 aspect-square bg-neutral-200 rounded-2xl overflow-hidden'
            >
                <Image
                    src={currentImage || Product_ImageUrl}
                    alt={Product_Title}
                    fill
                    className='object-cover'
                    priority
                />
            </div>
            <div
                className='col-span-7 md:col-span-1 z-20'
            >
                {Product_Sliders && Product_Sliders.length > 0 ? (
                <div className='grid grid-cols-7 md:grid-cols-1 md:grid-rows-6 grid-rows-1 gap-1'>
                    {PRODUCT_SLIDERS.slice(0,6).map((imgUrl: string, index: number) => (
                        <div
                        key={index}
                        role="button"
                        onClick={index === 5 && !isShowMore ? () => setIsShowMore(true) : () => setCurrentImage(imgUrl)}
                        className={`relative cursor-pointer
                            aspect-square bg-neutral-200 
                            rounded-lg overflow-hidden border-2
                            ${currentImage === imgUrl ?
                                "border-[#a17e33]"
                                :
                                "border-transparent hover:border-[#a17e33]"}`}
                                >
                        <Image
                            src={imgUrl}
                            alt={`${Product_Title} - Image ${index + 1}`}
                            fill
                            className='object-cover'
                            />
                            <div className="relative z-50">
                            </div>
                        {(index === 5 && !isShowMore) && (
                            <span
                            className="absolute z-10 text-white inset-0 flex justify-center items-center bg-black/60"
                            >
                                +
                                {Product_Sliders.length - 5}
                            </span>
                        )}
                    </div>
                    ))}
                </div>
                ) : (
                <p className='text-sm text-neutral-500 mt-4'>No additional images</p>
                )}
            </div>
            {isShowMore && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute left-full top-0 z-10 bg-white pl-1 w-21 h-full grid grid-cols-7 grid-rows-6 gap-1"
                >
                    {Product_Sliders.slice(6, 12).map((imgUrl: string, index: number) => (
                        <div
                            key={index}
                            role="button"
                            onClick={() => setCurrentImage(imgUrl)}
                            className='relative cursor-pointer border border-transparent hover:border-neutral-900 aspect-square bg-neutral-200 rounded-lg overflow-hidden'
                        >
                            <Image
                                src={imgUrl}
                                alt={`${Product_Title} - Image ${index + 6}`}
                                fill
                                className='object-cover'
                            />
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}