import axios from "axios";
import type { Task } from "@/models/task";
import { EnvConfig } from '@/configs/env.config';

const { apiUrl } = EnvConfig();
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${token}` },
});

export async function fetchTasks(): Promise<Task[]> {
  const res = await api.get(`/api/tasks`);
  return res.data;
}

export async function updateTask({
  id,
  updates,
}: {
  id: string;
  updates: Partial<Task>;
}): Promise<Task> {
  const res = await api.put<Task>(`/tasks/${id}`, updates);
  return res.data;
}
