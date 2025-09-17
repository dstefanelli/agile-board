export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignee: string;
}

export type TaskStatus = "To Do" | "In Progress" | "Done";
