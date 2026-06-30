import { NextRequest, NextResponse } from 'next/server';
import { getConfig, updateConfig } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = await getConfig();
  return NextResponse.json(config);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  await updateConfig(data);
  return NextResponse.json({ success: true });
}
