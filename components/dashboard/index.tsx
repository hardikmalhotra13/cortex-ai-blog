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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-3xl shadow-[inset_0_0_20px_rgba(99,102,241,0.2)] glow-border animate-pulse-slow">
            {profile?.name?.[0] || user.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight leading-tight mb-2">
              Welcome, <span className="text-gradient">{profile?.name || user.email?.split('@')[0]}</span>
            </h1>
            <p className="text-slate-400 flex items-center text-sm font-medium tracking-wide">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
              <span className="capitalize text-indigo-400 mr-2">{profile?.role}</span> 
              • Member since {new Date(profile?.created_at || Date.now()).getFullYear()}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          {(profile?.role === 'author' || profile?.role === 'admin') && (
            <Link href="/posts/create">
              <Button className="glow-border">
                <PlusSquare className="w-4 h-4 mr-2" />
                New Story
              </Button>
            </Link>
          )}
          <Button variant="outline" className="glow-border">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Stats */}
        <div className="space-y-8 lg:col-span-1">
          <div className="glass p-8 rounded-[2rem] glow-border shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500" />
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-400" />
              Insights
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center text-sm font-medium">
                  <BookOpen className="w-4 h-4 mr-2 text-indigo-400" />
                  Total Posts
                </span>
                <span className="text-2xl font-black text-white">{userPosts.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-10">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center">
                Your Published Work
                <span className="ml-4 px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">
                  {userPosts.length} Stories
                </span>
              </h2>
            </div>
            
            {userPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {userPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="glass border-2 border-dashed border-white/5 rounded-[3rem] p-20 text-center glow-border group hover:border-indigo-500/30 transition-all duration-500">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen className="w-10 h-10 text-slate-600 group-hover:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No stories yet</h3>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
                  Start your creative journey today and share your thoughts with the world.
                </p>
                {(profile?.role === 'author' || profile?.role === 'admin') && (
                  <Link href="/posts/create">
                    <Button variant="outline" size="sm" className="glow-border">
                      Start Writing
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
