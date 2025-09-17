import axios from "axios";
import type { User } from "@/models/user";
import { EnvConfig } from '@/configs/env.config';

const { apiUrl } = EnvConfig();

export interface LoginResponse {
  token: string;
  user: User;
}

export async function loginApi(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await axios.post<LoginResponse>(`${apiUrl}/api/login`, {
    email,
    password,
  });
  return res.data;
}
