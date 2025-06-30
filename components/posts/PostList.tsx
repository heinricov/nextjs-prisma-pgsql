"use client";

import useSWR from 'swr';

interface Author {
  id: number;
  name: string;
  email: string;
  // tambahkan properti lain yang diperlukan
}

interface Post {
  id: number;
  title: string;
  content: string | null;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
}

interface ApiResponse {
  data: Post[];
}

const fetcher = (url: string): Promise<Post[]> => 
  fetch(url).then(res => res.json() as Promise<Post[]>);

export default function PostList() {
  const { data: posts, error, isLoading } = useSWR<Post[]>('/api/posts', fetcher, {
    refreshInterval: 1000, // Refresh setiap 1 detik
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (error) return <div className="text-red-500 p-4">Gagal memuat data</div>;
  if (isLoading) return <div className="p-4">Memuat...</div>;
  if (!posts || posts.length === 0) return <div className="p-4">Belum ada post</div>;

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center -mt-16 p-4">
      <h1 className="text-4xl font-bold mb-8 font-sans text-[#333333]">
        Daftar Post
      </h1>
      <ul className="font-sans max-w-2xl space-y-4 w-full">
        {posts.map((post) => (
          <li key={post.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">{post.title}</h3>
            {post.content && <p className="text-gray-600 mt-1">{post.content}</p>}
            <div className="text-sm text-gray-500 mt-2">
              Oleh: {post.author?.name || 'Anonim'}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
