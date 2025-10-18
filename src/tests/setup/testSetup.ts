import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./server";

// Start server before tests run
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers after each test
afterEach(() => server.resetHandlers());

// Clean up once tests are done
afterAll(() => server.close());
