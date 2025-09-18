export interface User {
  email: string;
  id: number;
  name: string;
  role: UserRole;
  image?: string;
  language?: string;
}

export type UserRole = "developer" | "admin" | "manager";