'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { postsService } from '@/services/posts.service';
import { generateSummary } from '@/services/ai.service';
import { Post } from '@/types';
import { Sparkles, Image as ImageIcon, FileText, Send } from 'lucide-react';

interface PostFormProps {
  initialData?: Post;
  userId: string;
}

export const PostForm = ({ initialData, userId }: PostFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    body: initialData?.body || '',
    image_url: initialData?.image_url || '',
    summary: initialData?.summary || '',
  });

  const handleGenerateSummary = async () => {
    if (!formData.body) return alert('Please enter some content first.');
    setGenerating(true);
    try {
      const summary = await generateSummary(formData.body);
      setFormData({ ...formData, summary });
    } catch (error) {
      alert('Failed to generate summary.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      ...formData,
      author_id: userId,
    };

    try {
      if (initialData) {
        await postsService.updatePost(initialData.id, postData);
      } else {
        await postsService.createPost(postData);
      }
      router.push('/posts');
      router.refresh();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in duration-700">
      <div className="space-y-8">
        <Input
          label="Post Title"
          placeholder="Give your story a compelling title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="text-lg font-bold"
        />

        <Input
          label="Hero Image URL"
          placeholder="https://images.unsplash.com/photo-..."
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="font-mono text-xs"
        />

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-indigo-400" />
            Story Content
          </label>
          <textarea
            className="w-full min-h-[400px] p-6 rounded-[2rem] bg-slate-900/50 border border-white/5 focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 focus:outline-none text-slate-200 placeholder:text-slate-600 transition-all duration-300 leading-relaxed text-lg shadow-inner glow-border"
            placeholder="Once upon a time in the digital realm..."
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            required
          />
        </div>

        <div className="relative glass p-8 rounded-[2.5rem] border border-white/5 glow-border overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Sparkles className="w-16 h-16 text-indigo-400" />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <label className="text-base font-black text-white flex items-center uppercase tracking-widest">
              <Sparkles className="w-5 h-5 mr-2 text-indigo-400" />
              AI Intelligent Summary
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGenerateSummary}
              isLoading={generating}
              className="rounded-full px-6"
            >
              Generate with AI
            </Button>
          </div>
          
          <textarea
            className="w-full min-h-[120px] p-5 rounded-2xl bg-white/5 border border-white/5 text-slate-300 text-sm focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition-all resize-none italic leading-relaxed"
            placeholder="The AI summary will be crafted here to engage your readers instantly..."
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-8 border-t border-white/5">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-full px-8"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          isLoading={loading}
          className="rounded-full px-12 h-14 text-lg shadow-indigo-500/25"
        >
          {initialData ? 'Update Story' : 'Publish Story'}
          <Send className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </form>
  );
};
