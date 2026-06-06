import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const corsHeaders = {
  // 🛑 ማስተካከያ፦ ከ localhost ወደ ቀጥታ የክላውድ ሊንክዎ ይለውጡት
  'Access-Control-Allow-Origin': 'https://aletcloud.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

// ብሮውዘሩ መጀመሪያ የሚልከውን የ OPTIONS ጥሪ ለመመለስ የግድ ነው
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

function getUserIdFromToken(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  
  // 🛑 ማስተካከያ፦ አሬይ ውስጥ ያለውን ሁለተኛውን ክፍል [1] (ንጹህ ቶከኑን) መውሰድ አለብን
  const parts = authHeader.split(' '); 
  if (parts.length !== 2) return null;
  const token = parts[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: number };
    return decoded.userId;
  } catch (err) {
    console.error("JWT Verification Failed:", err);
    return null;
  }
}

export async function GET(request: Request) {
  const userId = getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json({ error: 'ያልተፈቀደ እቅስቃሴ' }, { status: 401, headers: corsHeaders });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(tasks, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  const userId = getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json({ error: 'ያልተፈቀደ እቅስቃሴ' }, { status: 401, headers: corsHeaders });
  }

  try {
    const { title, description } = await request.json();
    if (!title) {
      return NextResponse.json({ error: 'ርዕስ ያስፈልጋል' }, { status: 400, headers: corsHeaders });
    }

    const newTask = await prisma.task.create({
      data: { title, description, userId },
    });
    return NextResponse.json(newTask, { status: 201, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500, headers: corsHeaders });
  }
}
