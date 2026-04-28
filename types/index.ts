export type Role = 'viewer' | 'author' | 'admin';

export interface Profile {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  summary: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile; // Joined profile
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
  profiles?: Profile; // Joined profile
}

export interface UserSession {
  user: {
    id: string;
    email: string;
  } | null;
  profile: Profile | null;
}
