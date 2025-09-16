export interface User {
  email: string;
  id: number;
  name: string;
  role: UserRole;
}

export type UserRole = "developer" | "admin" | "manager";