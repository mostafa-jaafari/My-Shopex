"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FavoriteProduct {
    id: string;
    title: string;
    price: number;
    image: string;
}

interface AddToFavoriteContextType {
    favorites: FavoriteProduct[];
    totalFavorites: number;
    toggleFavorite: (product: FavoriteProduct) => void;
    isFavorite: (productId: string) => boolean;
}

const AddToFavoriteContext = createContext<AddToFavoriteContextType | undefined>(undefined);

export const AddToFavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            try {
                setTimeout(() => setFavorites(JSON.parse(storedFavorites)), 0);
            } catch (error) {
                console.error('Failed to parse favorites from localStorage:', error);
            }
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (product: FavoriteProduct) => {
        setFavorites((prevFavorites) => {
            const exists = prevFavorites.some((fav) => fav.id === product.id);
            if (exists) {
                return prevFavorites.filter((fav) => fav.id !== product.id);
            }
            return [...prevFavorites, product];
        });
    };

    const isFavorite = (productId: string) => {
        return favorites.some((fav) => fav.id === productId);
    };

    const value: AddToFavoriteContextType = {
        favorites,
        totalFavorites: favorites.length,
        toggleFavorite,
        isFavorite,
    };

    return (
        <AddToFavoriteContext.Provider value={value}>
            {children}
        </AddToFavoriteContext.Provider>
    );
};

export const useAddToFavorite = () => {
    const context = useContext(AddToFavoriteContext);
    if (context === undefined) {
        throw new Error('useAddToFavorite must be used within AddToFavoriteProvider');
    }
    return context;
};
