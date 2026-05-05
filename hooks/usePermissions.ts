import { User, Post } from "@/types";
import * as permissions from "@/lib/permissions";

/**
 * Returns a set of permission flags for the current user.
 * Use this to conditionally render UI.
 */
export function usePermissions(user: User | null) {
  return {
    // Role checks
    isAdmin: permissions.isAdmin(user),
    isAuthor: permissions.isAuthor(user),
    isViewer: permissions.isViewer(user),
    isAuthenticated: !!user,

    // Feature permissions
    canCreatePost: permissions.canCreatePost(user),
    canEditPost: (post: Post) => permissions.canEditPost(user, post),
    canDeletePost: (post: Post) => permissions.canDeletePost(user, post),
    canComment: permissions.canComment(user),
  };
}