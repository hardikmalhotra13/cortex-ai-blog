import { createClient } from '@/lib/supabase/client'

/**
 * Authentication Service
 * Handles user signup, signin, signout, and session management.
 * In demo mode (when Supabase keys are missing), it uses localStorage to persist mock sessions.
 */
export const authService = {
  async signUp(email: string, password: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const user = { id: 'mock_user', email };
      if (typeof window !== 'undefined') localStorage.setItem('mock_user', JSON.stringify(user));
      return { data: { user }, error: null };
    }
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const user = { id: 'mock_user', email };
      if (typeof window !== 'undefined') localStorage.setItem('mock_user', JSON.stringify(user));
      return { data: { user }, error: null };
    }
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (typeof window !== 'undefined') localStorage.removeItem('mock_user');
      return { error: null };
    }
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getUser() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('mock_user');
        return stored ? JSON.parse(stored) : null;
      }
      return null;
    }
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  async getProfile(userId: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      let mockRole = 'author';
      let mockEmail = 'demo@cortex.ai';
      let mockName = 'Demo User';
      
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('mock_user');
        if (stored) {
          const user = JSON.parse(stored);
          mockRole = user.role || 'author';
          mockEmail = user.email || 'demo@cortex.ai';
          mockName = user.name || (mockRole.charAt(0).toUpperCase() + mockRole.slice(1) + ' User');
        }
      }

      return { 
        data: { 
          id: userId, 
          name: mockName,
          email: mockEmail, 
          role: mockRole, 
          created_at: new Date().toISOString() 
        }, 
        error: null 
      };
    }
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  }
}
