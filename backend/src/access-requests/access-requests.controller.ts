import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AccessRequestsService } from './access-requests.service';

@Controller('access-requests')
@UseGuards(JwtAuthGuard)
export class AccessRequestsController {
  constructor(private readonly service: AccessRequestsService) {}

  @Post()
  request(
    @Req() req: { user: { id: string; fullName: string; role: string } },
  ) {
    return this.service.request(req.user);
  }
}
