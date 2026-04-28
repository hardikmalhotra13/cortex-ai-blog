import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-semibold text-slate-300 tracking-wide">
            {label}
          </label>
        )}
        <input
          className={cn(
            'flex w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 glow-border',
            error && 'border-red-500/50 focus:ring-red-500/50',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
