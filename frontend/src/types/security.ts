export interface SecurityAccount {
  role: "ADMIN" | "AGENT";
  authentication: "ACTIVE";
}

export interface SecurityPermissions {
  manageUsers: boolean;
  manageFields: boolean;
  viewReports: boolean;
  viewAuditLogs: boolean;
  manageAssignedFields: boolean;
}

export interface SecurityActivityItem {
  action: string;
  resource: string;
  createdAt: string;
}

export interface SecurityResponse {
  account: SecurityAccount;
  permissions: SecurityPermissions;
  recentActivity: SecurityActivityItem[];
}