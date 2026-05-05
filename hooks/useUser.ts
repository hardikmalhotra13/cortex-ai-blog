"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { authService } from "@/services/auth.service";
import type { User } from "@/types";

/**
 * Client-side hook that returns the current user's profile.
 * Subscribes to auth state changes so it stays in sync.
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      setLoading(true);
      try {
        const authUser = await authService.getUser();

        if (!authUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        const { data: profile } = await authService.getProfile(authUser.id);
        setUser(profile as User);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    // In Mock Mode, we rely on a manual refresh or landing page role selection
    // In Real Mode, we listen for auth changes
    let subscription: any = null;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && supabase) {
      const { data } = supabase.auth.onAuthStateChange(() => {
        loadUser();
      });
      subscription = data.subscription;
    } else {
      // Small interval for mock mode to pick up localStorage changes
      const interval = setInterval(loadUser, 3000);
      return () => clearInterval(interval);
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}