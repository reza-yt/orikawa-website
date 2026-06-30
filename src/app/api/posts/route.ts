import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/db';

export async function GET() {
  const posts = getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const post = createPost(data);
  return NextResponse.json(post, { status: 201 });
}
