'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, User, PenTool, Sparkles, Zap, Globe, Cpu } from 'lucide-react';
import { Button } from '@/components/ui';

export default function RoleSelectionPage() {
  const router = useRouter();

  const handleRoleSelection = (role: 'admin' | 'author' | 'viewer') => {
    if (typeof window !== 'undefined') {
      const mockUser = {
        id: `mock_${role}`,
        email: `${role}@cortex.ai`,
        role: role
      };
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      document.cookie = `mock_user=${JSON.stringify(mockUser)}; path=/; max-age=86400`;
      
      // Use location.href for a full page load to ensure server components see the cookie
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden selection:bg-primary/30">
      {/* 3D Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-glow delay-1000" />
        
        {/* Decorative Floating Icons */}
        <div className="absolute top-[20%] right-[15%] animate-float opacity-20">
          <Zap className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute bottom-[20%] left-[10%] animate-float delay-700 opacity-20">
          <Globe className="w-16 h-16 text-blue-400" />
        </div>
        <div className="absolute top-[10%] left-[40%] animate-float delay-1500 opacity-10">
          <Cpu className="w-20 h-20 text-purple-400" />
        </div>
      </div>

      <div className="max-w-6xl w-full relative z-10 text-center space-y-20 animate-in fade-in zoom-in duration-1000">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_30px_rgba(139,92,246,0.15)] animate-bounce-subtle">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Content</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none italic">
            CORT<span className="text-gradient">EX</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Experience a new dimension of storytelling where AI meets human creativity. 
            Select your perspective and explore the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
          {/* Admin Card */}
          <button 
            onClick={() => handleRoleSelection('admin')}
            className="group relative glass p-10 rounded-[3rem] glow-border card-3d text-left border-white/5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center mb-10 border border-indigo-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
              <Shield className="w-10 h-10 text-indigo-400" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Admin</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              Oversee the digital frontier. Manage users, monitor flows, and maintain the system's integrity.
            </p>
            <div className="space-y-3 mb-10">
              {['Global Access', 'User Control', 'System Audit'].map((item) => (
                <div key={item} className="flex items-center text-[10px] text-indigo-400/70 font-black uppercase tracking-[0.2em]">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex items-center text-indigo-400 font-black text-sm group-hover:translate-x-3 transition-transform duration-300">
              INITIALIZE SESSION <span className="ml-2">→</span>
            </div>
          </button>

          {/* Author Card */}
          <button 
            onClick={() => handleRoleSelection('author')}
            className="group relative glass p-10 rounded-[3rem] glow-border card-3d text-left border-primary/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-10 border border-primary/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-xl">
              <PenTool className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Author</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              Create the narrative. Leverage AI to distill complex ideas into compelling stories.
            </p>
            <div className="space-y-3 mb-10">
              {['AI Generation', 'Deep Analytics', 'Visual Studio'].map((item) => (
                <div key={item} className="flex items-center text-[10px] text-primary/70 font-black uppercase tracking-[0.2em]">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex items-center text-primary font-black text-sm group-hover:translate-x-3 transition-transform duration-300">
              CREATE STORY <span className="ml-2">→</span>
            </div>
          </button>

          {/* Viewer Card */}
          <button 
            onClick={() => handleRoleSelection('viewer')}
            className="group relative glass p-10 rounded-[3rem] glow-border card-3d text-left border-emerald-500/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mb-10 border border-emerald-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl">
              <User className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Explorer</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              Discover new horizons. Engage with a community of thinkers and visionary creators.
            </p>
            <div className="space-y-3 mb-10">
              {['Curated Feed', 'Smart Discovery', 'Active Engagement'].map((item) => (
                <div key={item} className="flex items-center text-[10px] text-emerald-400/70 font-black uppercase tracking-[0.2em]">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex items-center text-emerald-400 font-black text-sm group-hover:translate-x-3 transition-transform duration-300">
              BEGIN EXPLORATION <span className="ml-2">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
