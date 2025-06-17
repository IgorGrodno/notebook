import { userRole } from './userRole.interface';

export interface User {
  id: number;
  username: string;
  email: string;
  roles: userRole[];
}
