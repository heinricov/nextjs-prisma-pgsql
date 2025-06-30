"use client";

import useSWR from 'swr';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string | null;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

const fetcher = (url: string): Promise<Post[]> => 
  fetch(url).then(res => res.json() as Promise<Post[]>);

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return format(date, 'PPpp', { locale: id });
  } catch (error) {
    return 'Tanggal tidak valid';
  }
}

export default function PostList() {
  const { data: posts, error, isLoading } = useSWR<Post[]>('/api/posts', fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Daftar Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500 p-4 border rounded-md bg-red-50">
            Gagal memuat data. Silakan muat ulang halaman.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Daftar Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            {isLoading ? 'Memuat data...' : 'Daftar post yang telah dibuat'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Konten</TableHead>
              <TableHead>Pembuat</TableHead>
              <TableHead>Dibuat Pada</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Skeleton loading
              Array(3).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                </TableRow>
              ))
            ) : !posts || posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  Belum ada post
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{post.content || '-'}</TableCell>
                  <TableCell>{post.author?.name || 'Anonim'}</TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
