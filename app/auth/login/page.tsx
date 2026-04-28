'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { authService } from '@/services/auth.service';

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

    const { error } = await authService.signIn(formData.email, formData.password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] glow-border shadow-2xl relative z-10 animate-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-3">Welcome Back</h1>
          <p className="text-slate-400">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Button type="submit" className="w-full" isLoading={loading}>
            Sign In
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
