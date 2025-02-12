'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/contexts/FavoritesContext';
import WeatherDisplay from './WeatherDisplay';
import { City } from '@/hooks/useCities';

export default function FavoritesList() {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-1">
        <CardHeader></CardHeader>
        <CardContent>
          {favorites.length === 0 ? (
            <p>No favorite cities yet.</p>
          ) : (
            <ul className="space-y-2">
              {favorites.map((city) => (
                // Note: Added this combinated "key" because there is no ID on a city object, and I didn't want ot use index as key because remove item would rerender whole list
                <li key={`${city.country}_${city.lat}_${city.lon}`} className="flex justify-between items-center">
                  <Button variant="link" onClick={() => setSelectedCity(city)}>
                    {city.name}, {city.country}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => removeFavorite(city)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      {selectedCity && (
        <div className="md:col-span-2">
          <WeatherDisplay city={selectedCity} />
        </div>
      )}
    </div>
  );
}
