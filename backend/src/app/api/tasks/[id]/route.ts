import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const corsHeaders = {
  // 🛑 ማስተካከያ፦ ከ localhost ወደ ቀጥታ የክላውድ ሊንክዎ ይለውጡት
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
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return null;
  const token = parts[1];
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

// 🛑 ማስተካከያ፦ Next.js 16 ላይ params በ Promise ፎርማት ስለሚመጣ Promise በመጠቀም እንቀበለዋለን
export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> } // 👈 እዚህ ጋር Promise መደረጉን ያረጋግጡ
) {
  const userId = getUserIdFromToken(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

  try {
    // 🛑 ማስተካከያ፦ መጀመሪያ paramsን አዌይት (await) እናደርገዋለን
    const resolvedParams = await params;
    const taskId = parseInt(resolvedParams.id, 10);
    
    if (isNaN(taskId)) {
      return NextResponse.json({ error: 'Invalid Task ID' }, { status: 400, headers: corsHeaders });
    }

    const body = await request.json() as UpdateTaskRequest;
    const { title, description, isCompleted } = body;

    // 1. መጀመሪያ ተግባሩ የዚህ ተጠቃሚ መሆኑን ማረጋገጥ
    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId: userId }
    });

    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404, headers: corsHeaders });
    }

    // 2. መረጃውን ማስተካከል
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title !== undefined ? title : existingTask.title,
        description: description !== undefined ? description : existingTask.description,
        isCompleted: isCompleted !== undefined ? isCompleted : existingTask.isCompleted,
      },
    });

    return NextResponse.json(updatedTask, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Update SQL Error:", error);
    return NextResponse.json({ error: 'Failed to update database record' }, { status: 500, headers: corsHeaders });
  }
}

// 🛑 ማስተካከያ፦ DELETE API ላይም እንዲሁ params በ Promise መፈታት አለበት
export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> } // 👈 እዚህም ጋር Promise መደረጉን ያረጋግጡ
) {
  const userId = getUserIdFromToken(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

  try {
    // 🛑 ማስተካከያ፦ መጀመሪያ paramsን አዌይት (await) እናደርገዋለን
    const resolvedParams = await params;
    const taskId = parseInt(resolvedParams.id, 10);
    
    if (isNaN(taskId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400, headers: corsHeaders });

    await prisma.task.deleteMany({
      where: { id: taskId, userId: userId },
    });
    return NextResponse.json({ message: 'Deleted' }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500, headers: corsHeaders });
  }
}
