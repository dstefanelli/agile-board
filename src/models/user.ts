export interface User {
  email: string;
  id: number;
  name: string;
  role: UserRole;
  image: string;
}

export type UserRole = "developer" | "admin" | "manager";
