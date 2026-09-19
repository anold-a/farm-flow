import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { SecurityAccountDto } from './dto/security-response.dto';
import { SecurityPermissionsDto } from './dto/security-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityActivityItemDto } from './dto/security-response.dto';

@Injectable()
export class SecurityService {
  constructor(private readonly prisma: PrismaService) {}
  getAccountStatus(currentUser: AuthenticatedUser): SecurityAccountDto {
    return {
      role: currentUser.role,
      authentication: 'ACTIVE',
    };
  }

  getPermissions(currentUser: AuthenticatedUser): SecurityPermissionsDto {
    const isAdmin = currentUser.role === Role.ADMIN;

    return {
      manageUsers: isAdmin,
      manageFields: isAdmin,
      viewReports: true,
      viewAuditLogs: isAdmin,
      manageAssignedFields: !isAdmin,
    };
  }

  async getRecentActivity(
    currentUser: AuthenticatedUser,
  ): Promise<SecurityActivityItemDto[]> {
    const logs = await this.prisma.auditLog.findMany({
      where: { userId: currentUser.id }, 
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return logs.map((log) => ({
      action: log.action,
      resource: log.resource,
      createdAt: log.createdAt.toISOString(),
    }));
  }
}
