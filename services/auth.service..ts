/**
 * CortexPress — Auth Service
 * Wraps Supabase Auth + syncs the users table.
 */

import { createClient } from "@/lib/supabase/server";
import type { User, UserRole } from "@/types";

/**
 * Fetch the currently logged-in user's profile from the users table.
 * Returns null if not authenticated or profile not found.
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (error || !data) return null;
  return data as User;
}

/**
 * Sign up with email + password. Creates an auth user AND
 * inserts a corresponding row into the public users table.
 *
 * New users default to the 'viewer' role.
 */
export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return { error: error.message };
  if (!data.user) return { error: "Sign-up failed — no user returned." };

  // Insert profile row
  const { error: profileError } = await supabase.from("users").insert({
    id: data.user.id,
    name,
    email,
    role: "viewer" as UserRole, // default role
  });

  if (profileError) return { error: profileError.message };
  return { error: null };
}

/**
 * Sign in with email + password.
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  return { error: null };
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}