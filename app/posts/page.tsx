import React from 'react';
import { PostFeed } from '@/components/blog/PostFeed';
import { postsService } from '@/services/posts.service';

export default async function PostsPage() {
  const { data: posts } = await postsService.getPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in duration-1000">
      <PostFeed initialPosts={posts || []} />
    </div>
  );
}
