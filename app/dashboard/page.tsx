import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { postsService } from '@/services/posts.service';
import { Dashboard } from '@/components/dashboard';

export default async function DashboardPage() {
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

  let profile: any = null;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    profile = { id: user.id, email: user.email, role: 'author', created_at: new Date().toISOString() };
  } else {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  const { data: allPosts } = await postsService.getPosts();
  const userPosts = allPosts?.filter(p => p.author_id === user.id) || [];

  return (
    <Dashboard 
      user={{ id: user.id, email: user.email! }} 
      profile={profile} 
      userPosts={userPosts} 
    />
  );
}
