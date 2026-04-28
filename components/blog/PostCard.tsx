import React from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="card-3d rounded-2xl overflow-hidden group">
      {post.image_url && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="p-6 relative z-10">
        <div className="flex items-center space-x-2 text-sm text-slate-400 mb-3">
          <span className="flex items-center">
            <User className="w-3.5 h-3.5 mr-1 text-indigo-400" />
            {post.profiles?.name || post.profiles?.email?.split('@')[0] || 'Unknown Author'}
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1 text-indigo-400" />
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-slate-400 line-clamp-3 mb-4 text-sm leading-relaxed">
          {post.summary || post.body.substring(0, 150) + '...'}
        </p>
        
        <Link 
          href={`/posts/${post.id}`}
          className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Read Full Post
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
