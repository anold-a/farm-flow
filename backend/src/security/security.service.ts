import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { SecurityAccountDto } from './dto/security-response.dto';
import { SecurityPermissionsDto } from './dto/security-response.dto';

@Injectable()
export class SecurityService {
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
}
