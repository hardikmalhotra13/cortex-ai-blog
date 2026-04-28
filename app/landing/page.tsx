import Link from 'next/link';
import { Button } from '@/components/ui';
import { PostGrid } from '@/components/blog/PostGrid';
import { postsService } from '@/services/posts.service';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

export default async function LandingPage() {
  const { data: posts } = await postsService.getPosts();
  const featuredPosts = posts?.slice(0, 3) || [];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Write Smarter with <span className="text-gradient">Cortex</span>
          </h1>
          <p className="text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            The next-generation blogging platform powered by AI. Generate summaries, 
            engage with your audience, and build your digital presence effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/posts">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full">
                Explore Blog
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-indigo-500/10 rounded-full rotate-45" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-purple-500/5 rounded-full -rotate-45" />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 p-8 glass rounded-3xl glow-border">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Summarization</h3>
            <p className="text-slate-400 leading-relaxed">Automatically generate concise, engaging summaries for your long-form content using Gemini AI.</p>
          </div>
          <div className="space-y-4 p-8 glass rounded-3xl glow-border">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Secure & Reliable</h3>
            <p className="text-slate-400 leading-relaxed">Built on Supabase with robust authentication and real-time database capabilities.</p>
          </div>
          <div className="space-y-4 p-8 glass rounded-3xl glow-border">
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Modern Stack</h3>
            <p className="text-slate-400 leading-relaxed">Leveraging Next.js App Router and Tailwind CSS for a blazing fast, premium experience.</p>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Recent Stories</h2>
            <p className="text-slate-400 text-lg">Stay updated with the latest insights from our community.</p>
          </div>
          <Link href="/posts" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors hidden sm:block">
            View All Posts →
          </Link>
        </div>
        
        <PostGrid posts={featuredPosts} />
      </section>
    </div>
  );
}
