import { Controller, Post, Param, Body, UseGuards,Get  } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CropsService } from './crops.service';
import { AuthenticatedUser } from 'src/auth/types/authenticated-user.type';
import { CreateCropDto } from './dto/create-crop.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('fields')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post('/:fieldId/crops')
  @Roles('ADMIN')
  create(
    @Param('fieldId') fieldId: string,
    @Body() data: CreateCropDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.cropsService.create(data, fieldId, user.id);
  }

  @Roles('ADMIN', 'AGENT')
  @Get('/:fieldId/crops/active')
  findActiveByField(
    @Param('fieldId')
    fieldId: string,

    @CurrentUser()
    currentUser: AuthenticatedUser,
  ) {
    return this.cropsService.findActiveByField(fieldId, currentUser);
  }

  @Roles('ADMIN')
  @Get('/:fieldId/crops/history')
  findHistoryByField(
    @Param('fieldId') fieldId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.cropsService.findHistoryByField(fieldId, user);
  }
}
