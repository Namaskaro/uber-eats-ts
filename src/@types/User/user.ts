import { UserRole } from './user-role';

export type User = {
  id: number;
  role: UserRole;
  email: string;
  verified: boolean;
  isAuthenticated: boolean;
};

export type CurrentUser = {
  me: User;
};
