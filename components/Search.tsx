'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { City, useCities } from '@/hooks/useCities';
import { MapPin } from 'lucide-react';

interface SearchProps {
  onSelectCity: (city: City) => void;
}

export default function Search({ onSelectCity }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { data: cities, isLoading, error } = useCities(debouncedSearchTerm);

  // Note: Just for Debounce effect on search, probably can be replaced with lodash.debounce lib or similar
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cities && cities.length > 0) {
      const city = cities[0];
      setSearchTerm('');
      onSelectCity(city);
    }
  };

  const handleCitySelect = (city: City) => {
    setSearchTerm('');
    onSelectCity(city);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex gap-2">
        <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for a city" className="flex-grow" />
        <Button type="submit">Search</Button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {cities && searchTerm.length > 0 && (
        <ul className="mt-2 border-b border-l border-r border-gray-300">
          {/* Note: Need to use `index` as key because the API somtimes return duplicate cities (e.g Paris, FR) */}
          {cities.map((city, index) => (
            <li key={index} onClick={() => handleCitySelect(city)} className="cursor-pointer hover:bg-gray-100 p-2">
              <span className="inline-flex items-center">
                <MapPin className="w-5 h-5 mr-2" /> {city.name}, {city.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
