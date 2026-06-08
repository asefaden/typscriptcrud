// ❌ ይህንን የድሮውን መስመር ያጥፉት፦
// import { PrismaClient } from '@prisma/client';

// 👇 በፕሪስማ 7 አሰራር መሰረት በዚህ አዲሱ መስመር ይተኩት፦
import { PrismaClient } from '../../prisma/generated/client'; 
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient;

if (!globalForPrisma.prisma) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be set');
  }
  const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

  // አዲሱን ክሊየንት በአዳፕተሩ ማስነሳት
  prismaInstance = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaInstance;
  }
} else {
  prismaInstance = globalForPrisma.prisma;
}

export const prisma = prismaInstance;
