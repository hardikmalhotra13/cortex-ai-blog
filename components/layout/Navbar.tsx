'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { LogOut, User, LayoutDashboard, PlusSquare, Shield, Sparkles } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useUser } from '@/hooks/useUser';
import { usePermissions } from '@/hooks/usePermissions';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const { canCreatePost, isAdmin } = usePermissions(user);

  const handleSignOut = async () => {
    await authService.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="glass sticky top-0 z-50 transition-all duration-300 border-b border-white/5 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter group-hover:text-indigo-400 transition-colors">
                CORTEX
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              <Link
                href="/posts"
                className={cn(
                  'text-sm font-bold tracking-wide uppercase transition-all duration-300',
                  pathname === '/posts' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                )}
              >
                Feed
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className={cn(
                    'flex items-center text-sm font-bold tracking-wide uppercase transition-all duration-300',
                    pathname === '/admin' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {!loading && user ? (
              <>
                <Link href="/dashboard" className="hidden sm:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/5">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                {canCreatePost && (
                  <Link href="/posts/create" className="hidden sm:block">
                    <Button size="sm" className="glow-border">
                      <PlusSquare className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                  </Link>
                )}
                <div className="h-6 w-px bg-white/10 hidden sm:block" />
                
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-400 hover:text-red-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : !loading && (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5">Log In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="glow-border">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
