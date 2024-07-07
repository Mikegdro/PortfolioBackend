import { defineConfig } from 'drizzle-kit';

import dotenv from 'dotenv'

dotenv.config()

const DB_URL = process.env.DB_URL ?? ""

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: DB_URL
  }
});