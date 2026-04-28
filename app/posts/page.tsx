'use client'

import React, { useState, useEffect } from 'react';
import { PostGrid } from '@/components/blog/PostGrid';
import { SearchBar } from '@/components/blog/SearchBar';
import { postsService } from '@/services/posts.service';
import { Post } from '@/types';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await postsService.getPosts();
      if (data) {
        setPosts(data);
        setFilteredPosts(data);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 space-y-8 md:space-y-0">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-4">Discover <span className="text-gradient">Insights</span></h1>
          <p className="text-slate-400 text-lg max-w-xl">Explore the latest stories and experiences from the forward-thinking Cortex community.</p>
        </div>
        <div className="w-full md:w-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-[2rem] border border-white/5 h-[400px] animate-pulse" />
          ))}
        </div>
      ) : (
        <PostGrid posts={filteredPosts} />
      )}
    </div>
  );
}
