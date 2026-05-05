'use client'

import React from 'react';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui';
import { PlusSquare, BookOpen, Settings, User, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Post, Profile } from '@/types';

interface DashboardProps {
  user: { id: string; email: string };
  profile: Profile | null;
  userPosts: Post[];
}

export const Dashboard = ({ user, profile, userPosts }: DashboardProps) => {
  const isViewer = profile?.role === 'viewer';
  const isAdmin = profile?.role === 'admin';
  const isAuthor = profile?.role === 'author';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-3xl shadow-[inset_0_0_30px_rgba(99,102,241,0.2)] glow-border card-3d">
            {profile?.name?.[0] || user.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2">
              Welcome, <span className="text-gradient">{profile?.name || user.email?.split('@')[0]}</span>
            </h1>
            <p className="text-slate-400 flex items-center text-sm font-medium tracking-wide uppercase">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
              <span className="text-indigo-400 mr-2">{profile?.role} Perspective</span> 
              • Member since {new Date(profile?.created_at || Date.now()).getFullYear()}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          {(isAuthor || isAdmin) && (
            <>
              <Link href="/posts/create">
                <Button className="glow-border rounded-full px-8 h-12">
                  <PlusSquare className="w-4 h-4 mr-2" />
                  New Story
                </Button>
              </Link>
              <Button variant="outline" className="glow-border rounded-full px-8 h-12">
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Stats */}
        <div className="space-y-8 lg:col-span-1">
          <div className="dashboard-card group">
            <h3 className="text-lg font-bold text-white mb-8 flex items-center">
              <TrendingUp className="w-5 h-5 mr-3 text-indigo-400" />
              Platform Analytics
            </h3>
            <div className="space-y-8">
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">
                  {isAdmin ? 'System Volume' : 'Your Contribution'}
                </span>
                <span className="text-4xl font-black text-white flex items-baseline">
                  {userPosts.length}
                  <span className="text-sm font-bold text-slate-600 ml-2 uppercase tracking-tighter">Stories</span>
                </span>
              </div>
              
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Status</span>
                  <span className="text-emerald-400 font-black flex items-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          <div>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-white tracking-tight flex items-center italic">
                {isAdmin ? 'Platform Oversight' : isAuthor ? 'Creative Output' : 'Exploration Feed'}
                <span className="ml-6 px-4 py-1.5 bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                  {userPosts.length} Managed Items
                </span>
              </h2>
            </div>
            
            {userPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {userPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="glass border border-dashed border-white/10 rounded-[3.5rem] p-24 text-center glow-border group hover:bg-white/[0.02] transition-all duration-700">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl">
                  <BookOpen className="w-10 h-10 text-slate-500 group-hover:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Void Detected</h3>
                <p className="text-slate-500 mb-10 max-w-sm mx-auto text-base font-medium leading-relaxed">
                  The digital landscape here is currently empty. Start seeding the platform with your perspective.
                </p>
                {(isAuthor || isAdmin) && (
                  <Link href="/posts/create">
                    <Button variant="outline" className="glow-border rounded-full px-12 h-14">
                      Initialize Creation
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
