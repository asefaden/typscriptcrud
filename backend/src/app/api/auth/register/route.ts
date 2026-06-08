import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json() as any;

    if (!email || !password) {
      return NextResponse.json({ error: 'ኢሜይል እና ፓስወርድ ያስፈልጋል' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'ይህ ኢሜይል አስቀድሞ ተመዝግቧል' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'ምዝገባው ተሳክቷል', userId: user.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'የምዝገባ ስህተት ተከስቷል' }, { status: 500 });
  }
}
