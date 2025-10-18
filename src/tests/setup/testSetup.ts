import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./server";

// Start mock server before tests run
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers after each test
afterEach(() => server.resetHandlers());

// Stop server once all tests are done
afterAll(() => server.close());
