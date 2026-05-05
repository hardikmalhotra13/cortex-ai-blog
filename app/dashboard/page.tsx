import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { postsService } from '@/services/posts.service';
import { authService } from '@/services/auth.service';
import { Dashboard } from '@/components/dashboard';

export default async function DashboardPage() {
  const user = await authService.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  let profile: any = null;
  const { data: profileData } = await authService.getProfile(user.id);
  profile = profileData;

  const { data: allPosts } = await postsService.getPosts();
  let displayedPosts: any[] = [];

  if (profile?.role === 'admin' || profile?.role === 'viewer') {
    displayedPosts = allPosts || [];
  } else if (profile?.role === 'author') {
    displayedPosts = allPosts?.filter(p => p.author_id === user.id) || [];
  }

  return (
    <Dashboard 
      user={{ id: user.id, email: user.email! }} 
      profile={profile} 
      userPosts={displayedPosts} 
    />
  );
}
