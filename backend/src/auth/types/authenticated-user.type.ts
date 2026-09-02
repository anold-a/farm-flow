export interface AuthenticatedUser {
  id: string;
  role: 'ADMIN' | 'AGENT';
}
