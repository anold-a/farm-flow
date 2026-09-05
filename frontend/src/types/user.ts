export type UserRole = "ADMIN" | "AGENT";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}