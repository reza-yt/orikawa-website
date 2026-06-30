import { NextRequest, NextResponse } from 'next/server';
import { getConfig } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const config = await getConfig();
  
  if (username === config.admin.username && password === config.admin.password) {
    return NextResponse.json({ success: true, token: 'orikawa-admin-token' });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
