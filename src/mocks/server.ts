import { createServer, Response } from 'miragejs';
import tasksData from "@/mocks/data/tasks.json";

const AUTH_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6InRlc3R1c2VyQGRiLmNvbSIsInJvbGUiOiJkZXZlbG9wZXIiLCJpYXQiOjE3MjY2MTIwMDAsImV4cCI6MTcyNjY5ODQwMH0.
dummysignature1234567890abcdef`;

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    routes() {
      this.namespace = "api";

      // POST /login
      this.post("/login", (_schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        if (email === "test@example.com" && password === "1234") {
          return {
            token: AUTH_TOKEN,
            user: {
              id: 1,
              name: "Diego",
              email,
            },
          };
        }

        return new Response(
          401,
          {},
          { message: "Invalid email or password" }
        );
      });

      // GET /tasks
      this.get("/tasks", (_schema, request) => {
        const auth = request.requestHeaders["Authorization"];
        if (!auth?.startsWith("Bearer ")) {
          return new Response(
            401,
            {},
            { message: "Unauthorized" }
          );
        }
        return tasksData;
      }, { timing: 3000 }); // Simulate 3 seconds delay
    },
  });
}
