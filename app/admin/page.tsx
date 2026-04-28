import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { postsService } from '@/services/posts.service';
import { Button } from '@/components/ui';
import { Shield, Trash2, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function AdminPage() {
  const supabase = createClient();
  let user: any = null;
  let role: string = 'viewer';

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // In mock mode, we'll assume the user is authorized if they reached here 
    // but we can't easily check localStorage on server.
    // However, the Navbar only shows this link if role is admin.
    // For the sake of the demo, we'll allow it if in mock mode.
    user = { id: 'mock_admin', email: 'admin@cortex.ai' };
    role = 'admin';
  } else {
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    user = supabaseUser;
    
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      role = data?.role || 'viewer';
    }
  }

  if (!user || role !== 'admin') {
    redirect('/');
  }

  const { data: allPosts } = await postsService.getPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] glow-border">
            <Shield className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight leading-tight">Admin Console</h1>
            <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">Platform Oversight & Management</p>
          </div>
        </div>
      </div>

      <div className="glass rounded-[3rem] overflow-hidden glow-border shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-white/5">
                <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Story Title</th>
                <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Author</th>
                <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Published Date</th>
                <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allPosts?.map((post) => (
                <tr key={post.id} className="hover:bg-indigo-500/5 transition-all duration-300 group">
                  <td className="px-8 py-6">
                    <span className="text-white font-bold group-hover:text-indigo-400 transition-colors">{post.title}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {post.profiles?.name?.[0] || '?'}
                      </div>
                      <span className="text-slate-300 text-sm">{post.profiles?.name || post.profiles?.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-500 text-sm font-medium">
                    {new Date(post.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <Link href={`/posts/${post.id}`}>
                        <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link href={`/posts/edit/${post.id}`}>
                        <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
