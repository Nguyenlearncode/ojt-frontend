import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://localhost:5001/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === "test@example.com" && body.password === "123456") {
      return HttpResponse.json({
        accessToken: "fake_access_token",
        refreshToken: "fake_refresh_token",
      });
    }

    return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }),
];

export const server = setupServer(...handlers);
