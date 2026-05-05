'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { commentsService } from '@/services/comments.service';
import { Comment } from '@/types';
import { MessageSquare, Trash2, User, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentSectionProps {
  postId: string;
  userId: string | null;
}

export const CommentSection = ({ postId, userId: initialUserId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(initialUserId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // In mock mode, check localStorage if initialUserId is null
    if (!initialUserId && typeof window !== 'undefined') {
      const stored = localStorage.getItem('mock_user');
      if (stored) {
        const user = JSON.parse(stored);
        setCurrentUserId(user.id);
      }
    }
  }, [initialUserId]);

  const fetchComments = async () => {
    const { data } = await commentsService.getComments(postId);
    if (data) setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) return alert('Please login to comment');
    if (!newComment.trim()) return;

    setLoading(true);
    const { error } = await commentsService.addComment({
      post_id: postId,
      user_id: currentUserId,
      comment_text: newComment,
    });

    if (!error) {
      setNewComment('');
      fetchComments();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await commentsService.deleteComment(id);
    if (!error) fetchComments();
  };

  return (
    <div className="space-y-10 mt-20 pt-12 border-t border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Discussion <span className="text-slate-500 ml-2 text-lg font-medium">({comments.length})</span>
          </h3>
        </div>
      </div>

      {currentUserId ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <textarea
              className="w-full p-6 rounded-[2rem] bg-slate-900/50 border border-white/5 focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 focus:outline-none min-h-[140px] text-slate-200 placeholder:text-slate-500 transition-all duration-300 resize-none shadow-inner"
              placeholder="Join the conversation..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="absolute bottom-4 right-4">
              <Button 
                size="sm" 
                disabled={loading || !newComment.trim()}
                className="rounded-full h-12 w-12 p-0 flex items-center justify-center shadow-indigo-500/20"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass p-8 rounded-3xl text-center border border-white/5 glow-border">
          <p className="text-slate-400 mb-4">You must be logged in to participate in the discussion.</p>
          <a href="/auth/login" className="inline-block text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
            Login Now →
          </a>
        </div>
      )}

      <div className="space-y-8">
        {comments.length > 0 ? comments.map((comment) => (
          <div key={comment.id} className="flex space-x-6 group animate-in slide-in-from-left-4 duration-500">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 font-bold group-hover:border-indigo-500/30 transition-colors">
                {comment.author?.name?.[0] || comment.author?.email?.[0].toUpperCase() || '?'}
              </div>
            </div>
            <div className="flex-grow space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-white tracking-tight">
                    {comment.author?.name || comment.author?.email?.split('@')[0]}
                  </span>
                  <span className="text-xs text-slate-500 ml-3 font-medium">
                    {mounted ? new Date(comment.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' }) : '...'}
                  </span>
                </div>
                {currentUserId === comment.user_id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-slate-300 text-sm leading-relaxed shadow-sm group-hover:border-white/10 transition-colors">
                {comment.comment_text}
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-10 opacity-50">
            <p className="text-slate-500">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};
