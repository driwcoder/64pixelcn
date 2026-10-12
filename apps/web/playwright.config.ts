import { defineConfig } from "@playwright/test";

const PORT = 3100;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  timeout: 120_000,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    browserName: "chromium",
    // Use a preinstalled Chromium when the bundled one isn't downloaded.
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined },
  },
  // Tests run against a production build so they see what users get.
  webServer: {
    command: `pnpm build && pnpm start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
