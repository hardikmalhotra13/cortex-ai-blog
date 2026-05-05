import { redirect, notFound } from 'next/navigation';
import { PostForm } from '@/components/blog/PostForm';
import { postsService } from '@/services/posts.service';
import { authService } from '@/services/auth.service';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const user = await authService.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const post = await postsService.getPostById(params.id);

  if (!post) {
    notFound();
  }

  // Security: only author or admin can edit
  const { data: profile } = await authService.getProfile(user.id);
  const { canEditPost } = await import('@/lib/permissions');

  if (!canEditPost({ ...user, role: profile?.role } as any, post)) {
    redirect('/dashboard');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-1000">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-white tracking-tight mb-4">Refine Story</h1>
        <p className="text-slate-400 text-lg">Polishing your work for the community.</p>
      </div>

      <div className="glass p-10 rounded-[3rem] glow-border shadow-2xl">
        <PostForm initialData={post} userId={user.id} />
      </div>
    </div>
  );
}
