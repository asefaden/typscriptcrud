import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

interface LoginRequest {
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as LoginRequest;
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'እባክዎ ኢሜይል እና ፓስወርድ ያስገቡ' }, { status: 400, headers: corsHeaders });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'የተሳሳተ ኢሜይል ወይም ፓስወርድ' }, { status: 400, headers: corsHeaders });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'የተሳሳተ ኢሜይል ወይም ፓስወርድ' }, { status: 400, headers: corsHeaders });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    // 🛑 ማስተካከያ፦ የ corsHeaders እዚህ ጋር በደንብ መያያዝ አለበት
    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    }, { status: 200, headers: corsHeaders });

  } catch (error) {
    return NextResponse.json({ error: 'የመግቢያ ስህተት ተከስቷል' }, { status: 500, headers: corsHeaders });
  }
}
