"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
    productId: string;
    quantity: number;
    image_url: string;
    size: string;
    color: string;
    title: string;
    sale_price: number;
    regular_price: number;
};

type AddToCartContextType = {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    updateCart: (productId: string, quantity: number) => void;
    deleteFromCart: (productId: string, size: string, color: string) => void;
    clearCart: () => void;
    incrementQuantity: (productId: string, size: string, color: string) => void;
    decrementQuantity: (productId: string, size: string, color: string) => void;
    totalAmount: number;
};

const AddToCartContext = createContext<AddToCartContextType | null>(null);

export const AddToCartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) setTimeout(() => setCart(JSON.parse(saved)), 0);
    }, []);

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const totalAmount = cart.reduce((sum, item) => sum + item.sale_price * item.quantity, 0);

    const addToCart = (product: CartItem) => {
        setCart((prev) => {
            const existing = prev.find(
                (item) =>
                    item.productId === product.productId &&
                    item.size === product.size &&
                    item.color === product.color
            );
            return existing
                ? prev.map((item) =>
                        item.productId === product.productId &&
                        item.size === product.size &&
                        item.color === product.color
                            ? { ...item, quantity: item.quantity + product.quantity }
                            : item
                    )
                : [...prev, product];
        });
    };

    const updateCart = (productId: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    const deleteFromCart = (productId: string, size: string, color: string) => {
        setCart((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.productId === productId &&
                        item.size === size &&
                        item.color === color
                    )
            )
        );
    };

    const incrementQuantity = (productId: string, size: string, color: string) => {
        setCart((prev) =>
            prev.map((item) =>
                item.productId === productId &&
                item.size === size &&
                item.color === color
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementQuantity = (productId: string, size: string, color: string) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.productId === productId &&
                    item.size === size &&
                    item.color === color
                        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => setCart([]);

    return (
        <AddToCartContext.Provider
            value={{
                cart,
                addToCart,
                updateCart,
                deleteFromCart,
                clearCart,
                incrementQuantity,
                decrementQuantity,
                totalAmount,
            }}
        >
            {children}
        </AddToCartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(AddToCartContext);
    if (!context) throw new Error("useCart must be used within AddToCartProvider");
    return context;
};