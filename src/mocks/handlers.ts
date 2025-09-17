import { http, HttpResponse } from "msw";
import tasksData from "@/mocks/data/tasks.json";

const AUTH_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6InRlc3R1c2VyQGRiLmNvbSIsInJvbGUiOiJkZXZlbG9wZXIiLCJpYXQiOjE3MjY2MTIwMDAsImV4cCI6MTcyNjY5ODQwMH0.
dummysignature1234567890abcdef`;

let tasks = [...tasksData];

export const handlers = [
  // POST Login
  http.post("/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (email === "test@db.com" && password === "1234") {
      return HttpResponse.json(
        {
          token: AUTH_TOKEN,
          user: {
            id: 1,
            name: "Diego",
            email,
          },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // GET tasks
  http.get("/tasks", ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth?.startsWith("Bearer ")) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json(tasks);
  }),
];
