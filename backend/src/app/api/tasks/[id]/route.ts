import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

function getUserIdFromToken(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: number };
    return decoded.userId;
  } catch {
    return null;
  }
}

interface UpdateTaskRequest {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = getUserIdFromToken(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

  try {
    const taskId = parseInt(params.id, 10);
    if (isNaN(taskId)) return NextResponse.json({ error: 'Invalid Task ID' }, { status: 400, headers: corsHeaders });

    const body = await request.json() as UpdateTaskRequest;
    const existingTask = await prisma.task.findFirst({ where: { id: taskId, userId } });
    if (!existingTask) return NextResponse.json({ error: 'Task not found' }, { status: 404, headers: corsHeaders });

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: body.title ?? existingTask.title,
        description: body.description ?? existingTask.description,
        isCompleted: body.isCompleted ?? existingTask.isCompleted,
      },
    });

    return NextResponse.json(updatedTask, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Update SQL Error:", error);
    return NextResponse.json({ error: 'Failed to update database record' }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = getUserIdFromToken(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

  try {
    const taskId = parseInt(params.id, 10);
    if (isNaN(taskId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400, headers: corsHeaders });

    await prisma.task.deleteMany({ where: { id: taskId, userId } });
    return NextResponse.json({ message: 'Deleted' }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Delete SQL Error:", error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500, headers: corsHeaders });
  }
}
