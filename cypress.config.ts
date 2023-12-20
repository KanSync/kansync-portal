import { defineConfig } from "cypress";
import 'dotenv/config';

export default defineConfig({
  env: {
    githubToken: process.env.GITHUB_TOKEN,
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
