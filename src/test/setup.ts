import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

// Mock environment variables
process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
