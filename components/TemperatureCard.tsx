'use client';

import { Card } from '@/components/ui/card';
import { Sun, Cloud, CloudRain, Snowflake, Thermometer } from 'lucide-react';

interface TemperatureCardProps {
  temperature: number;
}

export function TemperatureCard({ temperature }: TemperatureCardProps) {
  const getTemperatureInfo = (temp: number) => {
    if (temp >= 30) {
      return {
        icon: <Sun className="w-8 h-8 text-orange-500" />,
        description: 'Hot',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-700',
      };
    } else if (temp >= 20) {
      return {
        icon: <Sun className="w-8 h-8 text-yellow-500" />,
        description: 'Warm',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
      };
    } else if (temp >= 10) {
      return {
        icon: <Cloud className="w-8 h-8 text-blue-400" />,
        description: 'Mild',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
      };
    } else if (temp >= 0) {
      return {
        icon: <CloudRain className="w-8 h-8 text-gray-500" />,
        description: 'Cool',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
      };
    } else {
      return {
        icon: <Snowflake className="w-8 h-8 text-sky-500" />,
        description: 'Cold',
        bgColor: 'bg-sky-50',
        textColor: 'text-sky-700',
      };
    }
  };

  const info = getTemperatureInfo(temperature);

  return (
    <Card className={`p-4 ${info.bgColor} border-none shadow-lg mt-4 mb-4`}>
      <div className="flex items-center gap-4">
        {info.icon}
        <div>
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-gray-500" />
            <span className="text-4xl font-bold">{temperature}°C</span>
          </div>
          <p className={`text-sm font-medium ${info.textColor}`}>{info.description}</p>
        </div>
      </div>
    </Card>
  );
}
