import { NextRequest, NextResponse } from 'next/server';

interface LoginRequestBody {
  email?: string;
  password?: string;
}

const DEMO_LOGIN_EMAIL = process.env.DEMO_LOGIN_EMAIL ?? 'user@demo-pharmacy.com';
const DEMO_LOGIN_PASSWORD = process.env.DEMO_LOGIN_PASSWORD ?? '123456';

export async function POST(request: NextRequest) {
  let body: LoginRequestBody;

  try {
    body = (await request.json()) as LoginRequestBody;
  } catch {
    return NextResponse.json(
      {
        message: 'Invalid JSON body.',
        code: 'INVALID_JSON',
      },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password?.trim();

  if (!email || !password) {
    return NextResponse.json(
      {
        message: 'Email and password are required.',
        code: 'VALIDATION_ERROR',
      },
      { status: 400 }
    );
  }

  if (email !== DEMO_LOGIN_EMAIL.toLowerCase() || password !== DEMO_LOGIN_PASSWORD) {
    return NextResponse.json(
      {
        message: 'Invalid email or password.',
        code: 'INVALID_CREDENTIALS',
      },
      { status: 401 }
    );
  }

  const accessToken = `demo_${crypto.randomUUID().replace(/-/g, '')}`;

  return NextResponse.json(
    {
      data: {
        accessToken,
        tokenType: 'Bearer',
        expiresIn: 3600,
        user: {
          id: 'user-1',
          name: 'Demo Pharmacy User',
          email,
          role: 'customer',
        },
      },
      message: 'Login successful.',
    },
    { status: 200 }
  );
}
