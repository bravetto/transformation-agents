import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Import Jest-specific setup for mocks
import "../test-utils/jest.setup";

afterEach(() => {
  cleanup();
});

// Mock environment variables
process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
