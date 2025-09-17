import axios from "axios";
import type { User } from "@/models/user";
import { EnvConfig } from '@/configs/env.config';

const { apiUrl } = EnvConfig();
const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${token}` },
});

export interface LoginResponse {
  token: string;
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

export async function getCurrentUser(token: string): Promise<User> {
  const res = await api.get<User>(`${apiUrl}/api/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
