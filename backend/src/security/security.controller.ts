import { Controller, Get, UseGuards } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Controller('security')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get()
  @Roles('ADMIN', 'AGENT')
  async getSecurityOverview(@CurrentUser() user: AuthenticatedUser) {
    const [account, permissions, recentActivity] = await Promise.all([
      this.securityService.getAccountStatus(user),
      this.securityService.getPermissions(user),
      this.securityService.getRecentActivity(user),
    ]);

    return { account, permissions, recentActivity };
  }
}
