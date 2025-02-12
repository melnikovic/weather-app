import { useQuery } from '@tanstack/react-query';

// Note: This interface would normally go to separate "interfaces" folder. But in this example with a single interface I decided to keep it here.
export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

const searchCities = async (query: string): Promise<City[]> => {
  const response = await fetch(`http://localhost:3000/api/cities?city=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  return response.json();
};

export const useCities = (searchTerm: string) => {
  return useQuery<City[], Error>({
    queryKey: ['cities', searchTerm],
    queryFn: () => searchCities(searchTerm),
    enabled: searchTerm.length > 2,
  });
};
