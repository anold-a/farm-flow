import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Controller('fields')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get('/:fieldId/recommendations')
  @Roles('ADMIN', 'AGENT')
  getForField(
    @Param('fieldId') fieldId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.recommendationsService.getForField(fieldId, user);
  }
}
