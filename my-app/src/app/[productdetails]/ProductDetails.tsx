"use client";

import { useCart } from "@/context/AddToCartContext";
import { useAddToFavorite } from "@/context/AddToFavoriteContext";
import { ProductType } from "@/GlobalTypes";
import { GetProductRating } from "@/utils/calculateTotalRating";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoBagHandle } from "react-icons/io5";
import { toast } from "sonner";



export const ProductDetails = ({ product }: { product: ProductType }) => {
    const [currentTab, setCurrentTab] = useState('الوصف');
    const [selectedValue, setSelectedValue] = useState({
        size: '',
        color: '',
        quantity: 1,
    })

    let RenderedTab;
    switch (currentTab) {
        case "الوصف":
            RenderedTab = <div dir={product.isArabic ? 'rtl' : 'ltr'}>
                {product.description || 'لا يوجد وصف لهذا المنتج.'}
            </div>
            break;
        case "المميزات":
            RenderedTab = <div>
                featured
            </div>
            break;
        case "الشحن":
            RenderedTab = <div>
                shipping
            </div>
            break;
        case "المراجعات":
            RenderedTab = <div>
                reviews
            </div>
            break;
        default:
            RenderedTab = <div>
                description
            </div>
            break;
    }

    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useAddToFavorite();

    const router = useRouter();
    const handleAddToCart = () => {
        if (!selectedValue.size || !selectedValue.color) {
            toast.error("Please select a size and color before adding to cart.");
            return;
        }

        addToCart({
            productId: product.id,
            size: selectedValue.size,
            title: product.title,
            color: selectedValue.color,
            image_url: product.image_url,
            quantity: selectedValue.quantity,
            sale_price: product.sale_price,
            regular_price: product.regular_price,
        })
    }

    const handleByNow = () => {
        if (!selectedValue.size || !selectedValue.color) {
            toast.error("Please select a size and color before buying.");
            return;
        }
        
        addToCart({
            productId: product.id,
            size: selectedValue.size,
            title: product.title,
            color: selectedValue.color,
            image_url: product.image_url,
            quantity: selectedValue.quantity,
            sale_price: product.sale_price,
            regular_price: product.regular_price,
        })
        router.push('/cart');
    }

    const IsFavoriteProduct = isFavorite(product.id);
    return (
        <div
            dir="rtl"
            className="w-full space-y-3 lg:pl-24"
        >
               {/* 🔹 Breadcrumb */}
            <nav className="text-sm text-gray-500 flex gap-1 items-center">
                <Link href="/" className="hover:underline">الرئيسية</Link>
                <span>/</span>
                <Link href={`/category/${product.category}`} className="hover:underline">{product.category}</Link>
                <span>/</span>
                <span className="primary-text font-semibold">{product.title}</span>
            </nav>
            <div
                dir={product.isArabic ? 'rtl' : 'ltr'}
                className="w-full space-y-6"
            >
                <h1
                    className="text-3xl font-bold text-neutral-800"
                >
                    {product.title}
                </h1>

                <div className="space-y-3">
                    {GetProductRating(product.reviews)}
                    <span>
                        <b className="text-3xl primary-text">
                            {product.sale_price.toFixed(2)}Dh
                        </b>
                        <span className="line-through text-gray-500 mx-2">
                            {product.regular_price.toFixed(2)}Dh
                        </span>
                    </span>
                </div>
            </div>

            <div
                className="w-full mt-6"
            >
                <div className="w-full flex border-b border-[#a17e33]/40">
                    {['الوصف', 'المميزات', 'الشحن', 'المراجعات'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setCurrentTab(tab)}
                            className={`w-full cursor-pointer px-4 py-2 text-sm
                                ${currentTab === tab ? 'border-b-2 border-[#a17e33] bg-[#a17e33]/10 primary-text' : 'text-gray-600'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
                <div
                    className="w-full p-3 text-neutral-700 text-sm"
                >
                    {RenderedTab}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-lg mb-3 primary-text">المقاسات : <span className="uppercase">{selectedValue.size}</span></h2>
                    <div>
                        {product.sizes && product.sizes.length > 0 ? (
                            <div className="flex gap-2">
                                {product.sizes.map((size, index) => (
                                    <div
                                        key={index}
                                        role="button"
                                        onClick={() => setSelectedValue({ ...selectedValue, size: size })}
                                        className={`uppercase px-4.5 py-2 border
                                            rounded-md text-sm cursor-pointer
                                            ${selectedValue.size === size ? 
                                                'primary-bg'
                                                :
                                                'outline-bg'}
                                            `}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-neutral-500">لا توجد ألوان متاحة لهذا المنتج.</p>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg mb-3 flex items-center gap-1.5 primary-text">اللون : <span style={{ backgroundColor: selectedValue.color }} className={`w-6 h-6 rounded-full flex ${selectedValue.color && "border-neutral-500"}`}/></h2>
                    <div>
                        {product.colors && product.colors.length > 0 ? (
                            <div className="flex gap-2">
                                {product.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        role="button"
                                        onClick={() => setSelectedValue({ ...selectedValue, color: color })}
                                        className={`relative w-10 h-10 border
                                            rounded-md text-sm cursor-pointer
                                            ${selectedValue.color === color ? 
                                                'border-2 border-neutral-500 text-white'
                                                :
                                                'border-neutral-300 hover:border-neutral-500'}
                                            `}
                                        style={{ backgroundColor: color }}
                                    >
                                        {selectedValue.color === color && (
                                            <span
                                                className="absolute inset-0 -top-1.5 -right-1"
                                            >
                                                <BiCheck size={16} className="primary-bg rounded-full"/>
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-neutral-500">لا توجد ألوان متاحة لهذا المنتج.</p>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg mb-3 primary-text">الكمية : <span>{selectedValue.quantity}</span></h2>
                    <div className="flex items-center gap-4">
                        <button
                            disabled={selectedValue.quantity <= 1}
                            onClick={() => setSelectedValue({ ...selectedValue, quantity: Math.max(1, selectedValue.quantity - 1) })}
                            className="w-10 h-10 flex justify-center items-center outline-bg cursor-pointer disabled:cursor-not-allowed rounded-md hover:border-neutral-900"
                        >
                            -
                        </button>
                        <span className="primary-text">{selectedValue.quantity}</span>
                        <button
                            onClick={() => setSelectedValue({ ...selectedValue, quantity: selectedValue.quantity + 1 })}
                            className="w-10 h-10 flex justify-center items-center outline-bg cursor-pointer disabled:cursor-not-allowed rounded-md hover:border-neutral-900"
                        >
                            +
                        </button>
                    </div>
                </div>

            </div>
            <div
                dir="ltr"
                className="w-full flex items-center gap-1.5"
            >
                <button
                    dir="rtl"
                    onClick={handleByNow}
                    className="cursor-pointer w-full flex items-center justify-center gap-1.5 py-3 primary-bg text-white rounded-md hover:bg-black/90 transition"
                >
                    اشتري الآن <IoBagHandle size={20}/>
                </button>

                <button
                    dir="rtl"
                    onClick={handleAddToCart}
                    className="cursor-pointer w-full flex items-center justify-center gap-1.5 py-3 outline-bg text-white rounded-md hover:bg-black/90 transition"
                >
                    اضف الى السلة <IoBagHandle size={20}/>
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite({
                            id: product.id,
                            image: product.image_url,
                            title: product.title,
                            price: product.sale_price,
                        });
                    }}
                    className={`cursor-pointer py-3 px-3 rounded-md border
                        transition
                        ${IsFavoriteProduct ? 'bg-[#ad852f]/20 border-[#ad852f]' : 'outline-bg'}`}
                >
                    {IsFavoriteProduct ?
                        <FaHeart size={20} className="primary-text"/>
                    :
                        <FaRegHeart size={20} className="primary-text"/>
                    }
                </button>
            </div>
        </div>
    )
}