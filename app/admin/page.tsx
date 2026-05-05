import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { postsService } from '@/services/posts.service';
import { Button } from '@/components/ui';
import { Shield, Trash2, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { authService } from '@/services/auth.service';

export default async function AdminPage() {
  const user = await authService.getUser();
  const { data: profile } = await authService.getProfile(user?.id || '');
  const role = profile?.role || 'viewer';

  const { isAdmin } = await import('@/lib/permissions');
  
  if (!user || !isAdmin({ role } as any)) {
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
  {post.title?.[0] || '?'}
</div>
<span className="text-slate-300 text-sm">
  Author
</span>
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
