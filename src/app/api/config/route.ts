import { NextRequest, NextResponse } from 'next/server';
import { getConfig, updateConfig } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getConfig());
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  updateConfig(data);
  return NextResponse.json({ success: true });
}
