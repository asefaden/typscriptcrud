export interface Task {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  userId: number;
  // Assuming createdAt and updatedAt are Date objects from Prisma
  createdAt: Date;
  updatedAt: Date;
}