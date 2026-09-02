import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
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

  private async getCoordinates(location: string, apiKey: string) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      location,
    )}&limit=1&appid=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new BadGatewayException('Failed to resolve location');
    }

    const results = await response.json();

    if (!results.length) {
      throw new NotFoundException('Location not found');
    }

    return { lat: results[0].lat, lon: results[0].lon };
  }

  private deriveSeverity(event: string): 'LOW' | 'MEDIUM' | 'HIGH' {
    const text = event.toLowerCase();
    if (text.includes('warning')) return 'HIGH';
    if (text.includes('watch')) return 'MEDIUM';
    return 'LOW';
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

    const { lat, lon } = await this.getCoordinates(location, apiKey);

    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=minutely,hourly`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new BadGatewayException('Failed to fetch weather data');
    }

    const data = await response.json();

    const current: CurrentWeatherDto = {
      location,
      temperature: data.current.temp,
      humidity: data.current.humidity,
      rainfall: data.current.rain?.['1h'] ?? 0,
      windSpeed: data.current.wind_speed,
      condition: data.current.weather[0]?.main ?? 'Unknown',
    };

    const forecast: DailyForecastDto[] = data.daily
      .slice(0, 7)
      .map((day: any) => ({
        date: new Date(day.dt * 1000).toISOString().split('T')[0],
        condition: day.weather[0]?.main ?? 'Unknown',
        minimumTemperature: day.temp.min,
        maximumTemperature: day.temp.max,
        chanceOfRain: Math.round((day.pop ?? 0) * 100),
      }));

    const alerts: WeatherAlertDto[] = (data.alerts ?? []).map(
      (alert: any, index: number) => ({
        id: `${index}`,
        title: alert.event,
        description: alert.description,
        severity: this.deriveSeverity(alert.event),
      }),
    );



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
