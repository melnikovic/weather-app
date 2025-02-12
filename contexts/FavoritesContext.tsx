'use client';

import { City } from '@/hooks/useCities';
import type React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

interface FavoritesContextType {
  favorites: City[];
  addFavorite: (city: City) => void;
  removeFavorite: (city: City) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<City[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (city: City) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, city];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavorite = (city: City) => {
    // Note: This is a bit more complex than it should be because we don't have an ID on the city object (it's not coming from API)
    setFavorites((prev) => {
      const newFavorites = prev.filter(
        (fav) => !(fav.name === city.name && fav.lat === city.lat && fav.lon === city.lon && fav.country === city.country)
      );
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>{children}</FavoritesContext.Provider>;
};
