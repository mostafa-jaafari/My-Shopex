"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AddToFavoriteContextType {
  favoritesIds: string[]; // exposed as array for UI mapping
  totalFavoritesIds: number;
  toggleFavorite: (productID: string) => void;
  isFavorite: (productID: string) => boolean;
}

const AddToFavoriteContext = createContext<AddToFavoriteContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const AddToFavoriteProvider: React.FC<ProviderProps> = ({ children }) => {
  // Internal Set to prevent repetitions
  const [favoritesSet, setFavoritesSet] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favoritesIds");
    if (stored) {
      try {
        const parsed: string[] = JSON.parse(stored);
        setTimeout(() => setFavoritesSet(new Set(parsed)),0)
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
      }
    }
  }, []);

  // Save favorites to localStorage (debounced)
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem("favoritesIds", JSON.stringify(Array.from(favoritesSet)));
    }, 150); // debounce
    return () => clearTimeout(handler);
  }, [favoritesSet]);

  // Toggle function: add if not exists, remove if exists
  const toggleFavorite = (productID: string) => {
    setFavoritesSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productID)) {
        newSet.delete(productID); // remove if exists
      } else {
        newSet.add(productID); // add if not exists
      }
      return newSet;
    });
  };

  const isFavorite = (productID: string) => favoritesSet.has(productID);

  const value: AddToFavoriteContextType = {
    favoritesIds: Array.from(favoritesSet),
    totalFavoritesIds: favoritesSet.size,
    toggleFavorite,
    isFavorite,
  };

  return <AddToFavoriteContext.Provider value={value}>{children}</AddToFavoriteContext.Provider>;
};

// Hook
export const useAddToFavorite = () => {
  const context = useContext(AddToFavoriteContext);
  if (!context) {
    throw new Error("useAddToFavorite must be used within AddToFavoriteProvider");
  }
  return context;
};