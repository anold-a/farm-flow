export interface SecurityAccountDto {
  role: 'ADMIN' | 'AGENT';
  authentication: 'ACTIVE';
}

export interface SecurityPermissionsDto {
  manageUsers: boolean;
  manageFields: boolean;
  viewReports: boolean;
  viewAuditLogs: boolean;
  manageAssignedFields: boolean;
}

export interface SecurityActivityItemDto {
  action: string;
  resource: string;
  createdAt: string;
}

export interface SecurityResponseDto {
  account: SecurityAccountDto;
  permissions: SecurityPermissionsDto;
  recentActivity: SecurityActivityItemDto[];
}
