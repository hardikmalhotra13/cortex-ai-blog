/**
 * Unified Supabase Client Factory
 * Automatically returns the correct client based on the environment (Client vs Server).
 */

export async function getSupabase() {
  // Browser / Client Side
  if (typeof window !== 'undefined') {
    const { createClient } = await import('./client');
    return createClient();
  } 
  
  // Node / Server Side
  try {
    const { createClient } = await import('./server');
    return createClient();
  } catch (e) {
    console.error('Failed to initialize server-side Supabase client:', e);
    return null;
  }
}
