import "dotenv/config";

export default {
  schema: "prisma/schema.prisma",
  datasource: {
    // 👇 Use process.env directly to bypass internal host string validation bugs
    url: process.env.DATABASE_URL || "", 
  }
};
