export interface CurrentWeatherDto {
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
}

export interface DailyForecastDto {
  date: string;
  condition: string;
  minimumTemperature: number;
  maximumTemperature: number;
  chanceOfRain: number;
}

export interface WeatherAlertDto {
  id: string;
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface WeatherResponseDto {
  current: CurrentWeatherDto;
  forecast: DailyForecastDto[];
  alerts: WeatherAlertDto[];
}