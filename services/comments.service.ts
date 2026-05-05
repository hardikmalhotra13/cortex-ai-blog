/**
 * CortexPress — Comments Service
 */

import { getSupabase } from "@/lib/supabase";
import type { Comment, CommentFormData } from "@/types";

/**
 * Fetch all comments for a specific post.
 */
export async function getComments(postId: string): Promise<{ data: Comment[] | null; error: any }> {
  const supabase = await getSupabase();

  if (!supabase) {
    // Mock Mode: Return some believable sample comments
    const mockComments: Comment[] = [
      {
        id: 'c1',
        post_id: postId,
        user_id: 'mock_admin',
        comment_text: "This is an incredible perspective on the future of AI. The section on organic futurism really resonates with current trends in architecture!",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        author: { name: 'Admin User', email: 'admin@cortex.ai' }
      },
      {
        id: 'c2',
        post_id: postId,
        user_id: 'mock_author',
        comment_text: "I completely agree. We're entering a phase where the digital and physical realms are no longer distinct entities.",
        created_at: new Date(Date.now() - 3600000).toISOString(),
        author: { name: 'Author User', email: 'author@cortex.ai' }
      }
    ];
    return { data: mockComments, error: null };
  }

  const { data, error } = await supabase
    .from("comments")
    .select(`
      id, comment_text, created_at, user_id,
      author:users!user_id(id, name, email)
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  return { data: data as unknown as Comment[], error };
}

/**
 * Add a comment to a post.
 */
export async function addComment(params: {
  post_id: string;
  user_id: string;
  comment_text: string;
}): Promise<{ data: Comment | null; error: any }> {
  const supabase = await getSupabase();
  if (!supabase) return { data: null, error: "Mock mode: Posting comments is disabled." };

  const { data, error } = await supabase
    .from("comments")
    .insert(params)
    .select(`
      id, comment_text, created_at, user_id,
      author:users!user_id(id, name, email)
    `)
    .single();

  return { data: data as unknown as Comment, error };
}

/**
 * Delete a comment.
 */
export async function deleteComment(commentId: string): Promise<{ error: any }> {
  const supabase = await getSupabase();
  if (!supabase) return { error: "Mock mode: Deleting comments is disabled." };

  const { error } = await supabase.from("comments").delete().eq("id", commentId);
  return { error };
}

export const commentsService = {
  getComments,
  addComment,
  deleteComment,
};