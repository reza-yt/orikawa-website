import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getProjects());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return NextResponse.json(createProject(data), { status: 201 });
}
