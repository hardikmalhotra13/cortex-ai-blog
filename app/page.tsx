'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, User, PenTool, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

export default function RoleSelectionPage() {
  const router = useRouter();

  const handleRoleSelection = (role: 'admin' | 'author' | 'viewer') => {
    // Save role to localStorage for mock mode
    if (typeof window !== 'undefined') {
      const mockUser = {
        id: `mock_${role}`,
        email: `${role}@cortex.ai`,
        role: role
      };
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      // Force a small delay to ensure localStorage is set before navigation
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-center items-center justify-center p-6 relative overflow-hidden">
      {/* 3D Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="max-w-5xl w-full relative z-10 text-center space-y-16 animate-in fade-in zoom-in duration-1000">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to Cortex</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            Choose Your <span className="text-gradient">Perspective</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Select a role to explore the platform's specialized features and experience the full potential of AI-driven blogging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Admin Card */}
          <button 
            onClick={() => handleRoleSelection('admin')}
            className="group relative glass p-10 rounded-[2.5rem] glow-border transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(99,102,241,0.3)] text-left"
          >
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30 group-hover:scale-110 transition-transform duration-500">
              <Shield className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Admin</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Full control over the platform. Monitor all posts, manage users, and oversee the entire community ecosystem.
            </p>
            <ul className="space-y-2 mb-8">
              {['View All Posts', 'Edit Any Content', 'Monitor Comments'].map((item) => (
                <li key={item} className="flex items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-indigo-400 font-bold group-hover:translate-x-2 transition-transform duration-300">Enter Admin Mode →</div>
          </button>

          {/* Author Card */}
          <button 
            onClick={() => handleRoleSelection('author')}
            className="group relative glass p-10 rounded-[2.5rem] glow-border transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(168,85,247,0.3)] text-left border-purple-500/20"
          >
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-8 border border-purple-500/30 group-hover:scale-110 transition-transform duration-500">
              <PenTool className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Author</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The creative engine. Write stories, use AI for summaries, and manage your personal portfolio of published work.
            </p>
            <ul className="space-y-2 mb-8">
              {['Create Stories', 'AI Summaries', 'Manage Own Posts'].map((item) => (
                <li key={item} className="flex items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-purple-400 font-bold group-hover:translate-x-2 transition-transform duration-300">Enter Author Mode →</div>
          </button>

          {/* Viewer Card */}
          <button 
            onClick={() => handleRoleSelection('viewer')}
            className="group relative glass p-10 rounded-[2.5rem] glow-border transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(52,211,153,0.3)] text-left border-emerald-500/20"
          >
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30 group-hover:scale-110 transition-transform duration-500">
              <User className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Viewer</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The community explorer. Read thought-provoking articles, gain insights from AI, and engage in discussions.
            </p>
            <ul className="space-y-2 mb-8">
              {['Read All Stories', 'AI Insights', 'Add Comments'].map((item) => (
                <li key={item} className="flex items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-emerald-400 font-bold group-hover:translate-x-2 transition-transform duration-300">Enter Viewer Mode →</div>
          </button>
        </div>
      </div>
    </div>
  );
}
