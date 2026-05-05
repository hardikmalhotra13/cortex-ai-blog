import { getSupabase } from '@/lib/supabase'

/**
 * Authentication Service
 * Handles user signup, signin, signout, and session management.
 * In demo mode (when Supabase keys are missing), it uses cookies to persist mock sessions for SSR support.
 */
export const authService = {
  async signUp(email: string, password: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const user = { id: 'mock_user', email, role: 'author' };
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_user', JSON.stringify(user));
        document.cookie = `mock_user=${JSON.stringify(user)}; path=/; max-age=86400`;
      }
      return { data: { user }, error: null };
    }
    const supabase = await getSupabase()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const user = { id: 'mock_user', email, role: 'author' };
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_user', JSON.stringify(user));
        document.cookie = `mock_user=${JSON.stringify(user)}; path=/; max-age=86400`;
      }
      return { data: { user }, error: null };
    }
    const supabase = await getSupabase()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mock_user');
        document.cookie = 'mock_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      return { error: null };
    }
    const supabase = await getSupabase()
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getUser() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // Server side check
      if (typeof window === 'undefined') {
        try {
          const { cookies } = await import('next/headers');
          const cookieStore = cookies();
          const mockUser = cookieStore.get('mock_user');
          return mockUser ? JSON.parse(mockUser.value) : null;
        } catch (e) {
          return null;
        }
      }
      // Client side check
      const stored = localStorage.getItem('mock_user');
      return stored ? JSON.parse(stored) : null;
    }
    const supabase = await getSupabase()
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  async getProfile(userId: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      let mockUserObj: any = null;
      
      // Server side check
      if (typeof window === 'undefined') {
        try {
          const { cookies } = await import('next/headers');
          const cookieStore = cookies();
          const cookie = cookieStore.get('mock_user');
          if (cookie) mockUserObj = JSON.parse(cookie.value);
        } catch (e) {}
      } else {
        // Client side check
        const stored = localStorage.getItem('mock_user');
        if (stored) mockUserObj = JSON.parse(stored);
      }

      const mockRole = mockUserObj?.role || 'author';
      const mockEmail = mockUserObj?.email || 'demo@cortex.ai';
      const mockName = mockUserObj?.name || (mockRole.charAt(0).toUpperCase() + mockRole.slice(1) + ' User');

      return { 
        data: { 
          id: userId || mockUserObj?.id || 'mock_user', 
          name: mockName,
          email: mockEmail, 
          role: mockRole, 
          created_at: new Date().toISOString() 
        }, 
        error: null 
      };
    }
    const supabase = await getSupabase()
    if (!supabase) return { data: null, error: 'Supabase not initialized' };
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  }
}
