import { createClient } from '@/lib/supabase/client'
import { Comment } from '@/types'

/**
 * Comments Service
 * Handles fetching and adding comments to blog posts.
 */
export const commentsService = {
  async getComments(postId: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('comments')
      .select('*, profiles(email, role)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    return { data: data as Comment[], error }
  },

  async addComment(comment: Partial<Comment>) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .select()
      .single()
    return { data, error }
  },

  async deleteComment(id: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
    return { error }
  }
}
