import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        id: 'desc', // Menggunakan id untuk pengurutan
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data post' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, authorId } = await request.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(authorId) || 1,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Gagal membuat post' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
