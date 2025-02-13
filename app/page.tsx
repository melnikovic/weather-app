import WeatherApp from '@/components/WeatherApp';

export default function Home() {
  return (
    <main className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <WeatherApp />
    </main>
  );
}
