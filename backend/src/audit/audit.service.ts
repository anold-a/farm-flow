import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(
    userId: string,
    action: string,
    resource: string,
    resourceId: string,
  ) {
    return this.prisma.auditLog.create({
      data:{
        userId,action,resource,resourceId
      }
    })
  }
}
