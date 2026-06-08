import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

const corsHeaders = {
  // 🛑 ማስተካከያ፦ ከ localhost ወደ ቀጥታ የክላውድ ሊንክዎ ይለውጡት
  'Access-Control-Allow-Origin': '*', 
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

// ብሮውዘሩ መጀመሪያ የሚልከውን የ OPTIONS ጥሪ ለማስተናገድ
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

interface RegisterRequest {
  name?: string;
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RegisterRequest;
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'ኢሜይል እና ፓስወርድ ያስፈልጋል' }, { status: 400, headers: corsHeaders });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'ይህ ኢሜይል አስቀድሞ ተመዝግቧል' }, { status: 400, headers: corsHeaders });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'ምዝገባው ተሳክቷል', userId: user.id }, { status: 201, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'የምዝገባ ስህተት ተከስቷል' }, { status: 500, headers: corsHeaders });
  }
}
