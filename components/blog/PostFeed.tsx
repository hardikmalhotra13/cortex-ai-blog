'use client'

import React, { useState } from 'react';
import { PostGrid } from './PostGrid';
import { SearchBar } from './SearchBar';
import { Post } from '@/types';

interface PostFeedProps {
  initialPosts: Post[];
}

export const PostFeed = ({ initialPosts }: PostFeedProps) => {
  const [posts] = useState<Post[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

  const handleSearch = (query: string) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 space-y-8 md:space-y-0">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-4">Discover <span className="text-gradient">Insights</span></h1>
          <p className="text-slate-400 text-lg max-w-xl">Explore the latest stories and experiences from the forward-thinking Cortex community.</p>
        </div>
        <div className="w-full md:w-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <PostGrid posts={filteredPosts} />
    </>
  );
};
