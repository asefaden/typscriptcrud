import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // 👇 Use process.env directly to bypass internal host string validation bugs
    url: process.env.DATABASE_URL || "", 
  },
});
