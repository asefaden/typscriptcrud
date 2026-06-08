// Use the path alias defined in tsconfig.json to ensure Docker builds resolve types correctly
import { PrismaClient } from '@prisma-client'; 
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient;

if (!globalForPrisma.prisma) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be set');
  }
  
  // Pass the DATABASE_URL (string) to the adapter to satisfy expected types
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
