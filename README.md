# Weather App - Next.js

This is a simple weather application built with **Next.js**, **React Query**, **Tailwind CSS**, and **Shadcn UI**. The app allows users to view weather data for cities, and they can mark a city as a favorite for quick access.

## Features

- Search for weather data by city name.
- Display current weather conditions like temperature, humidity, wind speed, etc.
- Option to mark cities as favorites for easy future access.
- Responsive design powered by **Tailwind CSS** and **Shadcn UI**.

## Prerequisites

- **Node.js** (LTS version recommended)
- **yarn**
- A **free OpenWeatherMap API key**. You can get it [here](https://openweathermap.org/).

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. Install dependencies using yarn:
   `yarn install`

3. Create a .env file in the root of the project and add the following environment variable:
   `NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your-api-key-here`

## Running the App

To run the development server:
`yarn dev`
Visit http://localhost:3000 in your browser to see the app in action.
