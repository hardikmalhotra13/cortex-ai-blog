import React from 'react';
import { PostCard } from './PostCard';
import { Post } from '@/types';

interface PostGridProps {
  posts: Post[];
}

export const PostGrid = ({ posts }: PostGridProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 glass rounded-[2rem] border border-white/5">
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No entries found in the Cortex</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
