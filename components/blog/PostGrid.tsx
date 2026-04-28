import React from 'react';
import { PostCard } from './PostCard';
import { Post } from '@/types';

interface PostGridProps {
  posts: Post[];
}

export const PostGrid = ({ posts }: PostGridProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">No posts found.</p>
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
