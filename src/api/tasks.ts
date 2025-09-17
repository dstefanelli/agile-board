import axios from "axios";
import type { Task } from "@/models/task";

const token = localStorage.getItem("token");
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export async function fetchTasks(): Promise<Task[]> {
  const res = await api.get("/tasks");
  return res.data;
}

export async function updateTask({
  id,
  updates,
}: {
  id: number;
  updates: Partial<Task>;
}): Promise<Task> {
  const res = await api.put(`/tasks/${id}`, updates);
  return res.data;
}
