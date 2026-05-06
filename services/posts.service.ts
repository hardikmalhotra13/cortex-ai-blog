/**
 * CortexPress — Posts Service
 * All database operations related to blog posts.
 */

import { getSupabase } from "@/lib/supabase";
import type { Post, PostFormData, PaginatedResponse } from "@/types";
import { generateSummary } from "./ai.service";

const PAGE_SIZE = 6;

// ---- Read -------------------------------------------------------

/**
 * Fetch paginated list of posts with author info and summary.
 */export async function getPosts(
  page = 1,
  searchQuery = ""
): Promise<PaginatedResponse<Post>> {
  const supabase = await getSupabase();

  if (!supabase) {
    const defaultPosts: Post[] = [
      {
        id: '1',
        title: 'The Neural Frontier: How AI is Reshaping Creative Expression',
        body: 'As we stand on the precipice of a new era, the intersection of artificial intelligence and human creativity is becoming increasingly blurred...',
        summary: 'An in-depth analysis of AI-human collaboration in the arts.',
        image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        author_id: 'mock_admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: { id: '1',name: 'Admin User', email: 'admin@cortex.ai' }
      },
      {
        id: '2',
        title: 'Quantum Aesthetics: The Rise of Generative Design',
        body: 'Generative design is no longer a niche curiosity; it is the cornerstone of modern industrial and digital aesthetics...',
        summary: 'Exploring the algorithmic roots of modern design.',
        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
        author_id: 'mock_author',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: { id: '2', name: 'Author User', email: 'author@cortex.ai' }
      },
      {
        id: '3',
        title: 'Digital Sovereignty in the Age of Data Monopolies',
        body: 'In an increasingly interconnected world, the concept of digital sovereignty has never been more critical...',
        summary: 'The battle for individual rights in a data-driven world.',
        image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
        author_id: 'mock_admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: { id: '1', name: 'Admin User', email: 'admin@cortex.ai' }
      },
      {
        id: '4',
        title: 'Beyond the Screen: The Future of Spatial Computing',
        body: 'Spatial computing is transcending the traditional boundaries of the screen...',
        summary: 'How AR and VR are blending our worlds.',
        image_url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac',
        author_id: 'mock_author',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: { id: '2', name: 'Author User', email: 'author@cortex.ai' }
      }
    ];

    let allPosts = [...defaultPosts];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mock_posts');
      if (stored) {
        const localPosts = JSON.parse(stored);
        allPosts = [...localPosts, ...allPosts];
      }
    }

    return {
      data: allPosts,
      count: allPosts.length,
      page: 1,
      pageSize: 12,
      totalPages: 1
    };
  }


  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("posts")
    .select(
      `
      id, title, body, image_url, summary, created_at, updated_at,
      author:users!author_id(id, name, email)
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (searchQuery.trim()) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data: (data as unknown as Post[]) ?? [],
    count: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
  };
}

/**
 * Fetch a single post by ID, including comments and author.
 */
export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await getSupabase();
  
  if (!supabase) {
    // Mock Mode Logic
    const { data: posts } = await getPosts();
    const post = posts.find(p => p.id === id);
    return post || null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id, title, body, image_url, summary, created_at, updated_at,
      author:users!author_id(id, name, email),
      comments(
        id, comment_text, created_at,
        author:users!user_id(id, name, email)
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) return null;
  return data as unknown as Post;
}

// ---- Create -----------------------------------------------------

/**
 * Create a new post. Automatically generates an AI summary.
 */
export async function createPost(
  formData: PostFormData,
  authorId: string
): Promise<Post> {
  const supabase = await getSupabase();
  
  if (!supabase) {
    // Mock Mode: Save to localStorage for demo persistence
    const newPost: Post = {
  id: Math.random().toString(36).substr(2, 9),

  title: formData.title,
  body: formData.body,
  image_url: formData.image_url ?? null,   // ✅ FIX
  summary: formData.summary ?? "Auto-generated summary",

  author_id: authorId,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  author: {
    id: authorId,
    name: 'Author User',
    email: 'author@cortex.ai'
  }
};
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mock_posts');
      const posts = stored ? JSON.parse(stored) : [];
      localStorage.setItem('mock_posts', JSON.stringify([newPost, ...posts]));
    }
    
    return newPost;
  }

  // AI Summary Generation (if not already provided by form)
  const summary = formData.summary || await generateSummary(formData.body);

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: formData.title,
      body: formData.body,
      image_url: formData.image_url ?? null,
      author_id: authorId,
      summary,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Post;
}


// ---- Update -----------------------------------------------------

/**
 * Update an existing post.
 * RLS policy in Supabase handles ownership / admin checks.
 */
export async function updatePost(
  id: string,
  formData: Partial<PostFormData>
): Promise<Post> {
  const supabase = await getSupabase();
  if (!supabase) throw new Error("Mock Mode: Database operations are disabled.");

  // Permission Check
  const { data: { user } } = await supabase.auth.getUser();
  const { data: post } = await supabase.from('posts').select('author_id').eq('id', id).single();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();
  
  const { canEditPost } = await import('@/lib/permissions');
  if (!canEditPost({ ...user, role: profile?.role } as any, post as any)) {
    throw new Error("Unauthorized: You do not have permission to edit this post.");
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      ...formData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Post;
}

// ---- Delete -----------------------------------------------------

/**
 * Delete a post by ID.
 * RLS policy handles permissions.
 */
export async function deletePost(id: string): Promise<void> {
  const supabase = await getSupabase();
  if (!supabase) throw new Error("Mock Mode: Database operations are disabled.");

  // Permission Check
  const { data: { user } } = await supabase.auth.getUser();
  const { data: post } = await supabase.from('posts').select('author_id').eq('id', id).single();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();
  
  const { canDeletePost } = await import('@/lib/permissions');
  if (!canDeletePost({ ...user, role: profile?.role } as any, post as any)) {
    throw new Error("Unauthorized: You do not have permission to delete this post.");
  }

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const postsService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
