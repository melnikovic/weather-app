import { useQuery } from '@tanstack/react-query';

interface WeatherData {
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  // Note: This is a public API key and should not be used here, example how to do it without it is in useCities.ts
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};

export const useWeather = (lat: number, lon: number) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', lat, lon],
    queryFn: () => fetchWeather(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 10 * 60 * 1000, // Note: This is only for demonstration that we can cache data for 10 minutes to avoid unnecessary API calls
  });
};
