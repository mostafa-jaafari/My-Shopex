"use client";

import { useCart } from "@/context/AddToCartContext";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";




export const ProductsCardTable = () => {
    
    const { cart, incrementQuantity, decrementQuantity, deleteFromCart, totalAmount, clearCart } = useCart();
    return (
        <table className="w-full text-sm border border-[#ad852f]/30 rounded-lg">
            <thead className="bg-[#ad852f]/5 primary-text">
                <tr className="border-b border-[#ad852f]/30">
                    <th className="text-left py-3 px-4 font-medium">المنتج</th>
                    <th className="text-center py-3 px-4 font-medium">السعر</th>
                    <th className="text-center py-3 px-4 font-medium">الكمية</th>
                    <th className="text-center py-3 px-4 font-medium">الإجمالي</th>
                    <th className="text-center py-3 px-4 font-medium">الإجراءات</th>
                </tr>
            </thead>

            <tbody className="divide-y">
                {cart.map((item, idx) => (
                <tr 
                    key={item.productId} 
                    className={`hover:bg-[#ad852f]/5 transition text-gray-500
                    ${idx !== cart.length - 1 && "border-b border-gray-200"}`}>
                    
                    {/* Product */}
                    <td className="py-2 px-4">
                    <div className="flex items-center gap-3">
                        <Image
                        src={item.image_url}
                        alt={item.title}
                        width={55}
                        height={55}
                        className="rounded-md bg-gray-100 object-cover"
                        />

                        <div className="flex flex-col">
                        <h1 className="text-sm font-semibold primary-text truncate max-w-50">
                            {item.title.length > 35
                            ? `${item.title.slice(0, 35)}...`
                            : item.title}
                        </h1>

                        <span className="text-xs text-gray-500 mt-1">
                            الحجم: {item.size} | اللون: {item.color}
                        </span>
                        </div>
                    </div>
                    </td>

                    {/* Price */}
                    <td className="py-2 px-4 text-center font-medium">
                    {item.sale_price} د.م
                    </td>

                    {/* Quantity */}
                    <td className="py-2 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button
                        disabled={item.quantity <= 1}
                        onClick={() =>
                            decrementQuantity(item.productId, item.size, item.color)
                        }
                        className="cursor-pointer w-7 h-7 rounded border border-gray-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                        -
                        </button>

                        <span className="min-w-5 text-center">
                        {item.quantity}
                        </span>

                        <button
                        onClick={() =>
                            incrementQuantity(item.productId, item.size, item.color)
                        }
                        className="cursor-pointer w-7 h-7 rounded border border-gray-300 hover:bg-gray-100"
                        >
                        +
                        </button>
                    </div>
                    </td>

                    {/* Total */}
                    <td className="py-2 px-4 text-center font-semibold">
                    {item.sale_price * item.quantity} د.م
                    </td>

                    {/* Actions */}
                    <td className="py-2 px-4 text-center">
                    <button
                        onClick={() =>
                        deleteFromCart(item.productId, item.size, item.color)
                        }
                        className="text-red-600 hover:text-red-700 cursor-pointer text-sm font-medium"
                    >
                        <BiTrash size={18} />
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>

                <tfoot>
                    <tr className="border-t border-[#ad852f]/30 bg-[#ad852f]/5">
                        <td colSpan={2} className="border-r border-[#ad852f]/30 text-center">
                            <span className="primary-text">إجمالي المنتجات</span>
                        </td>
                        <td className="text-center py-2 px-4 font-semibold primary-text">
                            {cart.length}
                        </td>
                        <td className="text-center primary-text py-2 px-4 font-semibold text-nowrap">
                            {totalAmount} د.م
                        </td>
                        <td className="text-center py-2 px-4">
                            <button
                                disabled={cart.length === 0}
                                onClick={clearCart}
                                className="py-2 text-red-600 hover:text-red-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-sm font-medium"
                            >
                                مسح السلة
                            </button>
                        </td>
                    </tr>
                </tfoot>
        </table>
    )
}