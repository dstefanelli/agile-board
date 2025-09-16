import { http, HttpResponse } from "msw";

const AUTH_TOKEN = "fmwlkfm-jetoe-123432r42";

export const handlers = [
  http.post("/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (email === "test@demo.com" && password === "123456") {
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
];
