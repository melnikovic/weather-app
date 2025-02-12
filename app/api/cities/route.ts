import { NextResponse } from 'next/server';

// Note: This API file exist only to demostrate how to hide API keys from a user. In real world we would probably never fetch cities from the client side.
// If we would need to fetch cities from the client side, we would need same API for weather
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const city = url.searchParams.get('city') || '';

    if (!city) {
      return NextResponse.json([], { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
