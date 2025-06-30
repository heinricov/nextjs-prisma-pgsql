'use server';

import prisma from '@/lib/prisma';

export async function createPost(prevState: any, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const authorId = 1; // Default author ID

    await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return { 
      success: true, 
      message: 'Post berhasil dibuat!' 
    };
  } catch (error) {
    console.error('Error creating post:', error);
    return { 
      success: false, 
      message: 'Gagal membuat post. Silakan coba lagi.' 
    };
  }
}
