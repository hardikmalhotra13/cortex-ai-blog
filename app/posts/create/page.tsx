import { redirect } from 'next/navigation';
import { PostForm } from '@/components/blog/PostForm';
import { authService } from '@/services/auth.service';

export default async function CreatePostPage() {
  const user = await authService.getUser();
  const { data: profile } = await authService.getProfile(user?.id || '');

  const { canCreatePost } = await import('@/lib/permissions');

  if (!user || !canCreatePost(profile as any)) {
    redirect('/dashboard');
  }



  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-1000">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-white tracking-tight mb-4">Create New Story</h1>
        <p className="text-slate-400 text-lg">Share your insights and let AI amplify your message.</p>
      </div>

      <div className="glass p-10 rounded-[3rem] glow-border shadow-2xl">
        <PostForm userId={user.id} />
      </div>
    </div>
  );
}
