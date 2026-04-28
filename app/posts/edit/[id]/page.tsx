import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PostForm } from '@/components/blog/PostForm';
import { postsService } from '@/services/posts.service';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  let user: any = null;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    user = { id: 'mock_user', email: 'demo@cortex.ai' };
  } else {
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    user = supabaseUser;
  }

  if (!user) {
    redirect('/auth/login');
  }

  const { data: post } = await postsService.getPostById(params.id);

  if (!post) {
    notFound();
  }

  // Security: only author or admin can edit
  let profile: any = null;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    profile = { role: 'author' };
  } else {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  if (post.author_id !== user.id && profile?.role !== 'admin') {
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
