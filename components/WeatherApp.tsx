'use client';

import { useState } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import { City } from '@/hooks/useCities';

export default function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div className="grid grid-cols-1 gap-4">
      <Search onSelectCity={(city) => setSelectedCity(city)} />
      {selectedCity && <WeatherDisplay city={selectedCity} />}
    </div>
  );
}
