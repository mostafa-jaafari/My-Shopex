"use client";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { IoBagHandle, IoSearchOutline } from "react-icons/io5";
import { GlobalLogo } from "./GlobaLogo";
import { useCart } from "@/context/AddToCartContext";
import Image from "next/image";
import { FaHeart, FaXmark } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAddToFavorite } from "@/context/AddToFavoriteContext";
import { IoIosSearch } from "react-icons/io";


export const Header = () => {
    const { cart, decrementQuantity, incrementQuantity, deleteFromCart, totalAmount, clearCart } = useCart();
    const { favorites } = useAddToFavorite();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [inputSearch, setInputSearch] = useState("");
    const CartRef = useRef<HTMLDivElement | null>(null);
    
    const SearchRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (CartRef.current && !CartRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
            if (SearchRef.current && !SearchRef.current.contains(event.target as Node)) {
                setIsOpenSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    
    return (
        <div
            className="sticky top-0 z-50 w-full flex items-center justify-between py-1.5 px-6 md:px-12 bg-white/60 backdrop-blur-sm border-b border-[#a17e33]/20"
            dir="ltr"
        >
            <GlobalLogo />
            <div
                className="flex w-max items-end gap-6 primary-text"
            >
                
                {/* --- CART --- */}
                <div
                    className="flex"
                    ref={CartRef}
                >
                    <button
                        onClick={() => setIsCartOpen((prev) => !prev)}
                        className="relative cursor-pointer"
                    >
                        <HiMiniShoppingBag size={20}/>
                        {cart.length > 0 && (
                            <span
                                className="absolute left-full -translate-x-2 -top-3 shadow-sm text-[10px] flex justify-center items-center font-bold primary-bg px-1 w-max h-4 rounded-full"
                            >
                                {cart.length}
                            </span>
                        )}
                    </button>

                    {/* --- PRODUCTS CART --- */}
                    {isCartOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-6 md:right-48 top-full shadow-lg bg-white p-3 w-full max-w-70 md:max-w-80 rounded-lg border border-neutral-200"
                        >
                            <div
                                dir="rtl"
                                className="w-full pb-1.5 border-b border-neutral-200 flex items-center justify-between"
                            >
                                <p className="text-sm text-gray-500">سلة التسوق</p>
                                {cart.length > 0 && (
                                    <button
                                        className="text-xs text-red-700 hover:text-red-600 cursor-pointer"
                                        onClick={clearCart}
                                    >
                                        مسح السلة
                                    </button>
                                )}
                            </div>
                            <div
                                className="w-full max-h-60 overflow-auto mt-1.5"
                            >
                                {cart.length > 0 ?
                                    cart.map((p, idx) => {
                                        return (
                                            <div
                                                key={p.productId + p.size + p.color}
                                                className={`w-full py-1.5
                                                    ${idx !== cart.length - 1 && "border-b border-neutral-200"}`}
                                                dir="rtl"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <Image
                                                        src={p.image_url}
                                                        alt={p.title}
                                                        width={60}
                                                        height={60}
                                                        className="object-cover rounded-lg bg-neutral-200"
                                                    />
                                                    <div className="w-full flex flex-col gap-1.5">
                                                        <span className="flex items-center justify-between">
                                                            <p className="text-xs primary-text font-semibold">{p.title.length > 20 ? `${p.title.slice(0,20)}...` : p.title}</p>
                                                            <FaXmark 
                                                                onClick={() => deleteFromCart(p.productId, p.size, p.color)}
                                                                size={18} 
                                                                className="text-gray-500 hover:text-gray-600 hover:bg-neutral-200 rounded-full p-0.5 cursor-pointer"/>
                                                        </span>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1.5 text-xs">
                                                                <button 
                                                                    onClick={() => decrementQuantity(p.productId, p.size, p.color)}
                                                                    className="w-4 h-4 flex justify-center items-center text-sm text-neutral-500 cursor-pointer border border-neutral-400 rounded">
                                                                        -
                                                                </button>
                                                                <p>{p.quantity}</p>
                                                                <button 
                                                                    onClick={() => incrementQuantity(p.productId, p.size, p.color)}
                                                                    className="w-4 h-4 flex justify-center items-center text-sm text-neutral-500 cursor-pointer border border-neutral-400 rounded">
                                                                        +
                                                                </button>
                                                            </div>
                                                            <p dir="ltr" className="text-xs text-gray-500">
                                                                {p.quantity} x {p.sale_price} د.م
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                            {p.size && (
                                                                <p>
                                                                    الحجم: {p.size}
                                                                </p>
                                                            )}
                                                            |
                                                            {p.color && (
                                                                    <p className="flex items-center gap-1.5">
                                                                        اللون: <span style={{ backgroundColor: p.color }} className="w-3 h-3 rounded-full flex"/>
                                                                    </p>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                :
                                (
                                    <p
                                        className="text-sm text-center py-6 text-gray-400 mb-2"
                                    >
                                        سلة التسوق الخاصة بك فارغة
                                    </p>
                                )}
                            </div>
                            {cart.length > 0 && (
                                <>
                                    <span className="flex w-full h-px bg-neutral-200 my-1.5"/>
                                    <span dir="rtl" className="py-1.5 flex items-center justify-between text-sm text-gray-500 text-left">
                                        <p>
                                            المجموع: 
                                        </p>
                                        {totalAmount} د.م
                                    </span>
                                    <button
                                    dir="rtl"
                                    className="w-full flex items-center justify-center gap-1.5 py-2 primary-bg cursor-pointer rounded-md text-sm">
                                        إتمام الشراء <IoBagHandle size={18}/>
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* --- FAVORITES --- */}
                <button className="relative">
                    <FaHeart size={20}/>
                    {favorites.length > 0 && (
                        <span
                            className="absolute left-full -translate-x-2 -top-3 shadow-sm text-[10px] flex justify-center items-center font-bold primary-bg px-1 w-max h-4 rounded-full"
                        >
                            {favorites.length || 0}
                        </span>
                    )}
                </button>

                {/* --- SEARCH --- */}
                <div
                    ref={CartRef}
                    className="flex"
                >
                    <button
                        onClick={() => setIsOpenSearch(true)}
                        className="cursor-pointer"
                    >
                        <IoSearchOutline size={20}/>
                    </button>

                    {isOpenSearch && (
                        <div
                            className="fixed inset-0 flex justify-center pt-14 px-6 bg-black/60 w-full h-screen"
                        >
                            <motion.div
                                ref={SearchRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white w-full max-w-125 h-125 overflow-auto rounded-2xl border border-neutral-300"
                            >
                                <div className="flex items-center gap-3 border-b border-neutral-300 pr-4">
                                    <input
                                        type="text"
                                        dir="rtl"
                                        placeholder="ابحث عن منتجك المفضل..."
                                        value={inputSearch}
                                        onChange={(e) => setInputSearch(e.target.value)}
                                        maxLength={50}
                                        className="outline-none w-full py-2.5 pl-4"
                                    />
                                    <IoIosSearch size={20} className="opacity-60"/>
                                </div>
                                hello
                            </motion.div>
                        </div>
                    )}
                </div>
                <button
                    className="w-max flex text-sm cursor-pointer"
                >
                    تسجيل الدخول
                </button>
            </div>
        </div>
    )
}