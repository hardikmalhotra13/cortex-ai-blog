import { User, Post, UserRole } from "@/types";

/**
 * RBAC Permission Helpers
 * Centralizes the logic for what each role can do.
 */

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const isAuthor = (user: User | null): boolean => {
  return user?.role === 'author';
};

export const isViewer = (user: User | null): boolean => {
  return user?.role === 'viewer';
};

/**
 * Can a user create a post?
 * Only Authors and Admins.
 */
export const canCreatePost = (user: User | null): boolean => {
  if (!user) return false;
  return isAdmin(user) || isAuthor(user);
};

/**
 * Can a user edit a specific post?
 * Admins can edit anything.
 * Authors can only edit their own posts.
 */
export const canEditPost = (user: User | null, post: Post | null): boolean => {
  if (!user || !post) return false;
  if (isAdmin(user)) return true;
  return isAuthor(user) && post.author_id === user.id;
};

/**
 * Can a user delete a specific post?
 * Admins can delete anything.
 * Authors can delete their own posts.
 */
export const canDeletePost = (user: User | null, post: Post | null): boolean => {
  return canEditPost(user, post); // Same logic for now
};

/**
 * Can a user add a comment?
 * Any authenticated user.
 */
export const canComment = (user: User | null): boolean => {
  return !!user;
};
