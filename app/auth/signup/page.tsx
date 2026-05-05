'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { authService } from '@/services/auth.service';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await authService.signUp(formData.email, formData.password);

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
          // Use location.href to ensure server components see the cookie immediately
          window.location.href = '/dashboard';
        } else {
          setSuccess(true);
          setLoading(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  if (success) {
    const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL;
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-200 text-center shadow-xl">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isMock ? 'Mock Account Created!' : 'Check your email'}
          </h1>
          <p className="text-gray-600">
            {isMock 
              ? 'You are in demo mode. No email was sent, you can proceed to the dashboard.' 
              : `We've sent a verification link to ${formData.email}. Please check your inbox to complete your registration.`}
          </p>
          <Link href={isMock ? '/dashboard' : '/auth/login'} className="inline-block mt-8 text-primary font-semibold">
            {isMock ? 'Go to Dashboard' : 'Return to Login'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] glow-border shadow-2xl relative z-10 animate-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-3">Create Account</h1>
          <p className="text-slate-400">Join our community of forward-thinking writers</p>
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

          <Button type="submit" className="w-full h-14 rounded-2xl" isLoading={loading}>
            Sign Up
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
