import React from 'react';
import { Sparkles, Github, Twitter, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-slate-950 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-500/30">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">CORTEX</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Empowering creators with AI-driven insights and a premium storytelling experience.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex space-x-8">
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center text-sm font-bold uppercase tracking-widest">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center text-sm font-bold uppercase tracking-widest">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center text-sm font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Privacy
              </a>
            </div>
            <div className="text-slate-600 text-xs font-medium tracking-wide">
              © {new Date().getFullYear()} CORTEX AI. DESIGNED FOR THE FUTURE.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
