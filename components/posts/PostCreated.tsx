"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { createPost } from '@/app/actions/post-actions';

export default function NewPost() {
  const [state, formAction] = useFormState(createPost, { message: '', success: true });
  const { pending } = useFormStatus();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Buat Post Baru</h1>
      {state?.message && (
        <div className={`p-4 mb-4 rounded-lg ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {state.message}
        </div>
      )}
      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Judul
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Masukkan judul post"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={pending}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg mb-2">
            Konten
          </label>
          <textarea
            id="content"
            name="content"
            required
            placeholder="Tulis konten post di sini..."
            rows={6}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={pending}
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className={`w-full py-3 rounded-lg text-white font-medium ${pending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          aria-disabled={pending}
        >
          {pending ? 'Mengirim...' : 'Buat Post'}
        </button>
      </form>
    </div>
  );
}
