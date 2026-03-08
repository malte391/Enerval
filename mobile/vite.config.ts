import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    // automatically load env
    setupFiles: ["dotenv/config"],
  },
});