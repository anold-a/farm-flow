
export class WeatherDto {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    condition: string;
  };
}