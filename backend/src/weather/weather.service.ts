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
import { WeatherDto } from './dto/weather.dto';


@Injectable()
export class WeatherService {
  constructor(private readonly prisma: PrismaService) {}

  async getByLocation(location: string): Promise<WeatherDto> {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      throw new Error(
        'OPENWEATHER_API_KEY is not defined in environment variables',
      );
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location,
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new BadGatewayException('Failed to fetch weather data');
    }

    const data = await response.json();

    return {
      location,
      current: {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        condition: data.weather[0]?.main ?? 'Unknown',
      },
    };
  }

  async getByField(
    fieldId: string,
    currentUser: AuthenticatedUser,
  ): Promise<WeatherDto> {
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
