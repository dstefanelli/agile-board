import axios from "axios";
import type { User } from "@/models/user";

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginResponse {
  token: string;
  user: User;
}

export async function loginApi(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await axios.post<LoginResponse>(`${API_URL}/login`, {
    email,
    password,
  });
  return res.data;
}
