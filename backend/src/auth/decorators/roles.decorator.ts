import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: ('ADMIN' | 'AGENT')[]) =>
  SetMetadata(ROLES_KEY, roles);
