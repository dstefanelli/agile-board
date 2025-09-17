import { createServer, Response } from 'miragejs';
import tasksData from "@/mocks/data/tasks.json";

const imageUrl = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80";
const AUTH_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRpZWdvIiw
            iZW1haWwiOiJ0ZXN0dXNlckBkYi5jb20iLCJyb2xlIjoiZGV2
            ZWxvcGVyIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMzYwMDB9.
            dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk`;

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
           };
        }

        return new Response(
          401,
          {},
          { message: "Invalid email or password" }
        );
      });

      // GET /user
      this.get("/user", (_schema, request) => {
        const auth = request.requestHeaders["Authorization"];
        const user =  {
          id: 1,
          name: "Diego Stefanelli",
          image: imageUrl,
          role: "developer",
          email: "test@example.com",
        };
        if (!auth?.startsWith("Bearer ")) {
          return new Response(
            401,
            {},
            { message: "Unauthorized" }
          );
        }
        return user;
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

      // TODO: PUT tasks/:id to update a task
    },
  });
}
