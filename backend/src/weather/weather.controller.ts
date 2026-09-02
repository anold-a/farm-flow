import { Controller , Get, Param, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Controller('weather')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @Roles('ADMIN', 'AGENT')
  getByLocation(@Query('location') location: string) {
    if (!location) {
      throw new BadRequestException('location query parameter is required');
    }
    return this.weatherService.getByLocation(location);
  }

  @Get('field/:fieldId')
  @Roles('ADMIN', 'AGENT')
  getByField(
    @Param('fieldId') fieldId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.weatherService.getByField(fieldId, user);
  }
}
