'use client';

import { useWeather } from '@/hooks/useWeather';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { City } from '@/hooks/useCities';
import { MapPin } from 'lucide-react';
import { TemperatureCard } from './TemperatureCard';

export default function WeatherDisplay({ city }: { city: City }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { data: weather, isLoading, error } = useWeather(city.lat, city.lon);

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.name === city.name && fav.lat === city.lat && fav.lon === city.lon));
  }, [city]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
    setIsFavorite(!isFavorite);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {city.name}
          <Button variant="ghost" size="icon" onClick={toggleFavorite} className={isFavorite ? 'text-yellow-400' : ''}>
            <Star className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {weather && (
          <>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-semibold">{weather.name}</h2>
                </div>
                <p className="text-lg text-gray-600 capitalize">{weather.weather[0].description}</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="text-lg font-semibold">{weather.main.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Wind Speed</p>
                    <p className="text-lg font-semibold">{Math.round(weather.wind.speed)} m/s</p>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <TemperatureCard temperature={Math.round(weather.main.temp)} />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
