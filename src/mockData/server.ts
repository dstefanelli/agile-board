import { createServer, Response, Model } from "miragejs";
import tasksData from "@/mockData/data/tasks.json";

const imageUrl =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80";
const AUTH_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRpZWdvIiw
            iZW1haWwiOiJ0ZXN0dXNlckBkYi5jb20iLCJyb2xlIjoiZGV2
            ZWxvcGVyIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMzYwMDB9.
            dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk`;

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      task: Model,
    },

    seeds(server) {
      tasksData.forEach((task) => {
        server.create("task", task);
      });
    },

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

        return new Response(401, {}, { message: "Invalid email or password" });
      });

      // GET /user
      this.get("/user", (_schema, request) => {
        const auth = request.requestHeaders["Authorization"];
        const user = {
          id: 1,
          name: "Diego Stefanelli",
          image: imageUrl,
          role: "developer",
          email: "test@example.com",
          language: "es",
        };
        if (!auth?.startsWith("Bearer ")) {
          return new Response(401, {}, { message: "Unauthorized" });
        }
        return user;
      });

      // GET /tasks
      this.get(
        "/tasks",
        (schema, request) => {
          const auth = request.requestHeaders["Authorization"];
          if (!auth?.startsWith("Bearer ")) {
            return new Response(401, {}, { message: "Unauthorized" });
          }
          return schema.db.tasks;
        },
        { timing: 3000 } // Simulate 3 seconds delay
      );

      // PUT tasks/:id
      this.put("/tasks/:id", (schema, request) => {
        const id = request.params.id;
        const updates = JSON.parse(request.requestBody);

        const task = schema.db.tasks.find(id);
        if (!task) {
          return new Response(404, {}, { error: "Task not found" });
        }
        if (task.status === "Done") {
          return new Response(404, {}, { error: "This task is Done" });
        }

        schema.db.tasks.update(id, { ...task, ...updates });
        return schema.db.tasks.find(id);
      });
    },
  });
}
