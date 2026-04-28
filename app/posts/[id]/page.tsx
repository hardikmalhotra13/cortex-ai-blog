import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { postsService } from '@/services/posts.service';
import { CommentSection } from '@/components/blog/CommentSection';
import { Calendar, User, ArrowLeft, Edit, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: post } = await postsService.getPostById(params.id);
  return {
    title: post ? `${post.title} | Cortex` : 'Post Not Found',
    description: post?.summary || post?.body.substring(0, 160),
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: post } = await postsService.getPostById(params.id);

  if (!post) {
    notFound();
  }

  const isAuthor = user?.id === post.author_id;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <header className="space-y-6 text-center">
          <div className="flex justify-between items-center mb-6">
            <Link 
              href="/posts" 
              className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Feed
            </Link>
            {isAuthor && (
              <Link href={`/posts/edit/${post.id}`}>
                <Button variant="outline" size="sm" className="glow-border">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Post
                </Button>
              </Link>
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center space-x-6 text-slate-400">
            <span className="flex items-center">
              <User className="w-5 h-5 mr-2 text-indigo-400" />
              {post.profiles?.name || post.profiles?.email?.split('@')[0]}
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-400" />
              {new Date(post.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </span>
          </div>
        </header>

        {post.image_url && (
          <div className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 glow-border">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full max-h-[600px] object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        )}

        {post.summary && (
          <div className="glass p-8 rounded-3xl border-l-4 border-indigo-500 glow-border relative overflow-hidden bg-slate-900/50">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-12 h-12 text-indigo-400" />
            </div>
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generated Summary
            </h4>
            <p className="text-slate-200 text-lg leading-relaxed italic font-medium">
              "{post.summary}"
            </p>
          </div>
        )}

        <div className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed text-xl">
          {post.body.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6">{paragraph}</p>
          ))}
        </div>

        <CommentSection postId={post.id} userId={user?.id || null} />
      </article>
    </div>
  );
}
