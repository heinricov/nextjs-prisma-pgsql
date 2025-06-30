"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { createPost } from '@/app/actions/post-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function NewPost() {
  const [state, formAction] = useFormState(createPost, { message: '', success: true });
  const { pending } = useFormStatus();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Buat Post Baru</CardTitle>
        <CardDescription>Buat dan publikasikan postingan baru</CardDescription>
      </CardHeader>
      <CardContent>
        {state?.message && (
          <Alert variant={state.success ? 'default' : 'destructive'} className="mb-4">
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium leading-none">
              Judul
            </label>
            <Input
              id="title"
              name="title"
              required
              placeholder="Masukkan judul post"
              disabled={pending}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium leading-none">
              Konten
            </label>
            <Textarea
              id="content"
              name="content"
              required
              placeholder="Tulis konten post di sini..."
              rows={6}
              disabled={pending}
              className="min-h-[120px]"
            />
          </div>
          <Button 
            type="submit" 
            disabled={pending}
            className="w-full"
            aria-disabled={pending}
          >
            {pending ? 'Mengirim...' : 'Buat Post'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
