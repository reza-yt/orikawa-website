import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  const filename = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
  
  const blob = await put(filename, file, {
    access: 'public',
  });

  return NextResponse.json({ url: blob.url });
}
