'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { authService } from '@/services/auth.service';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await authService.signIn(formData.email, formData.password);

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        // Use location.href to ensure server components see the cookie immediately
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px] animate-pulse-glow delay-1000" />

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="glass p-12 rounded-[3rem] glow-border shadow-2xl border-white/5">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentication</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Welcome <span className="text-gradient">Back</span></h1>
            <p className="text-slate-400 text-sm font-medium">Continue your journey in the Cortex</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-bold text-center animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl p-4 focus:border-primary/50 transition-all"
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl p-4 focus:border-primary/50 transition-all"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 rounded-2xl group transition-all h-14"
              isLoading={loading}
            >
              <span className="flex items-center justify-center">
                SIGN IN <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </form>

          <div className="text-center mt-10">
            <p className="text-sm text-slate-500 font-medium">
              New to the platform?{' '}
              <Link href="/auth/signup" className="text-primary font-black hover:text-primary/80 transition-colors underline-offset-4 hover:underline">
                CREATE ACCOUNT
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
