import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadGatewayException,
} from '@nestjs/common';

import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

import {
  CurrentWeatherDto,
  DailyForecastDto,
  WeatherAlertDto,
  WeatherResponseDto,
} from './dto/weather-response.dto';

const CACHE_TTL_MS = 10 * 60 * 1000;

interface CacheEntry {
  
  data: WeatherResponseDto;
  expiresAt: number;
}

@Injectable()
export class WeatherService {
  private cache = new Map<string, CacheEntry>();
  constructor(private readonly prisma: PrismaService) {}

  private buildAlerts(current: CurrentWeatherDto): WeatherAlertDto[] {
    const alerts: WeatherAlertDto[] = [];

    if (current.temperature >= 35) {
      alerts.push({
        id: 'heat-1',
        title: 'Extreme Heat',
        description: `Temperature is ${current.temperature}°C — consider extra irrigation.`,
        severity: 'HIGH',
      });
    }

    if (current.rainfall >= 20) {
      alerts.push({
        id: 'rain-1',
        title: 'Heavy Rainfall',
        description: `${current.rainfall}mm of rain in the last hour — check for flooding risk.`,
        severity: 'MEDIUM',
      });
    }

    if (current.windSpeed >= 40) {
      alerts.push({
        id: 'wind-1',
        title: 'High Wind',
        description: `Wind speed at ${current.windSpeed} km/h — secure loose equipment.`,
        severity: 'MEDIUM',
      });
    }

    return alerts;
  }

  async getByLocation(location: string): Promise<WeatherResponseDto> {
    const cacheKey = location.trim().toLowerCase();
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      throw new Error(
        'OPENWEATHER_API_KEY is not defined in environment variables',
      );
    }

    
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
  location,
)}&appid=${apiKey}&units=metric`;
    
    const response = await fetch(currentUrl);

    if (!response.ok) {
      throw new BadGatewayException('Failed to fetch weather data');
    }

    const data = await response.json();

    const current: CurrentWeatherDto = {
      location,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] ?? 0,
      windSpeed: data.wind_speed * 3.6,
      condition: data.weather[0]?.main ?? 'Unknown',
    };


    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      location,
    )}&appid=${apiKey}&units=metric`;

    const forecastResponse = await fetch(forecastUrl);

    if (!forecastResponse.ok) {
      throw new BadGatewayException('Failed to fetch forecast data');
    }

    const forecastData = await forecastResponse.json();

   
    const dailyMap = new Map<
      string,
      { temps: number[]; conditions: string[]; pop: number[] }
    >();

    for (const entry of forecastData.list) {
      const date = new Date(entry.dt * 1000).toISOString().split('T')[0];

      if (!dailyMap.has(date)) {
        dailyMap.set(date, { temps: [], conditions: [], pop: [] });
      }

      const day = dailyMap.get(date)!;
      day.temps.push(entry.main.temp);
      day.conditions.push(entry.weather[0]?.main ?? 'Unknown');
      day.pop.push(entry.pop ?? 0);
    }



    const forecast: DailyForecastDto[] = Array.from(dailyMap.entries())
      .slice(0, 5)
      .map(([date, day]) => ({
        date,
        condition: day.conditions[Math.floor(day.conditions.length / 2)],
        minimumTemperature: Math.min(...day.temps),
        maximumTemperature: Math.max(...day.temps),
        chanceOfRain: Math.round(Math.max(...day.pop) * 100),
      }));

     const alerts = this.buildAlerts(current);

    const result: WeatherResponseDto = { current, forecast, alerts };

    this.cache.set(cacheKey, {
      data: result,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return result;
  }

  async getByField(
    fieldId: string,
    currentUser: AuthenticatedUser,
  ): Promise<WeatherResponseDto> {
    const field = await this.prisma.field.findUnique({
      where: { id: fieldId },
    });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    if (
      currentUser.role === Role.AGENT &&
      field.assignedAgentId !== currentUser.id
    ) {
      throw new ForbiddenException('You do not have access to this field');
    }

    return this.getByLocation(field.location);
  }
}
