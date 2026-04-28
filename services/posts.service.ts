import { createClient } from '@/lib/supabase/client'
import { Post } from '@/types'

/**
 * Posts Service
 * Handles CRUD operations for blog posts.
 * Includes role-based logic:
 * - Authors can only edit/delete their own posts.
 * - Admins can edit/delete any post.
 */
export const postsService = {
  async getPosts() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { data: MOCK_POSTS, error: null };
    }
    const supabase = createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(email, role)')
      .order('created_at', { ascending: false })
    return { data: data as Post[], error }
  },

  async getPostById(id: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const post = MOCK_POSTS.find(p => p.id === id);
      return { data: post || null, error: post ? null : { message: 'Not found' } };
    }
    const supabase = createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(email, role)')
      .eq('id', id)
      .single()
    return { data: data as Post, error }
  },

  async createPost(post: Partial<Post>) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const newPost = { ...post, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() };
      MOCK_POSTS.unshift(newPost as Post);
      return { data: newPost, error: null };
    }
    const supabase = createClient()
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single()
    return { data, error }
  },

  async updatePost(id: string, post: Partial<Post>) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async deletePost(id: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
    return { error }
  }
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Rise of Agentic AI: Beyond Chatbots',
    body: 'The landscape of Artificial Intelligence is shifting from passive assistants to autonomous agents. Unlike traditional chatbots that wait for a prompt, Agentic AI can plan, reason, and execute multi-step tasks independently. This transition marks a significant milestone in software engineering. Imagine an AI that doesn\'t just write code but also sets up the environment, runs tests, and deploys the application. This proactive nature reduces the burden on human developers and accelerates innovation. However, with this power comes the need for robust safety frameworks and ethical guidelines. We must ensure these agents act within defined boundaries to avoid unintended consequences. The future is not just about talking to machines, but about collaborating with digital coworkers who can think and act on our behalf. As we integrate these agents into our daily workflows, the definition of productivity will be rewritten.',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    summary: 'Agentic AI represents a leap from reactive chatbots to proactive, autonomous systems capable of executing complex workflows independently, promising to redefine productivity and software development.',
    author_id: 'user_1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: { id: 'user_1', name: 'Dr. Aris Thorne', email: 'aris@cortex.ai', role: 'author', created_at: '' }
  },
  {
    id: '2',
    title: 'Modern Web Architecture with Next.js 15',
    body: 'Next.js has become the gold standard for React applications, and version 15 pushes the boundaries even further. With the introduction of partial prerendering and improved server actions, developers can build sites that are both fast and highly dynamic. The App Router architecture encourages a more modular approach to building web pages, separating concerns between client and server components. This leads to better performance and smaller bundle sizes for the end-user. Moreover, the deep integration with Vercel makes deployment and scaling a breeze. Whether you are building a small personal blog or a massive e-commerce platform, Next.js provides the tools necessary to succeed in the modern web landscape. By leveraging these latest features, you can ensure your application remains competitive and provides a top-tier user experience. The era of static-only sites is over; the future is hybrid.',
    image_url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec',
    summary: 'Next.js 15 enhances web development with partial prerendering and server actions, enabling fast, dynamic, and modular hybrid applications that deliver superior user experiences.',
    author_id: 'user_2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: { id: 'user_2', name: 'Leo Vance', email: 'leo@next.js', role: 'author', created_at: '' }
  },
  {
    id: '3',
    title: 'The Psychology of Minimalist Design',
    body: 'In an age of information overload, minimalist design offers a breath of fresh air. By focusing on essential elements, designers can create interfaces that are not only beautiful but also highly functional. Minimalism is not about removing everything; it\'s about removing the noise so the message can shine through. Effective use of whitespace, bold typography, and a limited color palette can guide the user\'s eye and reduce cognitive load. This approach leads to better conversion rates and higher user satisfaction. When a user isn\'t overwhelmed by choices, they can focus on what truly matters. However, achieving simplicity is often harder than creating complexity. It requires a deep understanding of user needs and the discipline to say no to unnecessary features. A minimalist aesthetic communicates a sense of premium quality and confidence, making it a favorite for modern tech brands.',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    summary: 'Minimalist design improves functionality and user focus by removing digital noise, creating premium experiences that reduce cognitive load and enhance clarity.',
    author_id: 'user_3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: { id: 'user_3', name: 'Elena Gray', email: 'elena@design.co', role: 'author', created_at: '' }
  },
  {
    id: '4',
    title: 'Cybersecurity in the Age of Quantum Computing',
    body: 'Quantum computing promises to solve problems that are currently impossible for classical computers, but it also poses a massive threat to our current encryption standards. Algorithms like RSA and ECC could be easily broken by a sufficiently powerful quantum computer. This has led to the rise of post-quantum cryptography, a field dedicated to developing encryption methods that are resistant to quantum attacks. Organizations must start preparing for this "Y2Q" moment today, as the transition to new standards will take years. While quantum-resistant algorithms are still being standardized, the sense of urgency is growing. Data that is encrypted today could be harvested now and decrypted later once quantum hardware becomes available. Protecting our digital infrastructure requires a proactive approach to security, staying ahead of the technological curve. The race between quantum code-breakers and post-quantum code-makers is the next great frontier in cybersecurity.',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48',
    summary: 'The advent of quantum computing threatens existing encryption, necessitating a shift toward post-quantum cryptography to protect long-term data security against future quantum-powered attacks.',
    author_id: 'user_4',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: { id: 'user_4', name: 'Marcus Flint', email: 'marcus@sec.io', role: 'author', created_at: '' }
  },
  {
    id: '5',
    title: 'The Evolution of Remote Work Culture',
    body: 'The global shift to remote work has fundamentally changed how we think about the workplace. It\'s no longer a physical location we go to, but a digital space we inhabit. While remote work offers flexibility and eliminates commutes, it also presents challenges in terms of team cohesion and work-life balance. Successful remote cultures prioritize asynchronous communication and trust over micromanagement. They leverage tools like Slack, Zoom, and Notion to stay connected, but they also recognize the importance of intentional face-to-face time. As companies adopt hybrid models, the focus is shifting toward "distributed-first" thinking. This means ensuring that every employee, regardless of their location, has equal access to information and opportunities. The future of work is about results rather than hours spent at a desk. By embracing this cultural shift, organizations can attract talent from across the globe and build more diverse and resilient teams.',
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    summary: 'Remote work has redefined the workplace as a digital space, shifting organizational focus toward trust, asynchronous communication, and results-based performance over physical presence.',
    author_id: 'user_5',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: { id: 'user_5', name: 'Sarah Jenkins', email: 'sarah@work.com', role: 'author', created_at: '' }
  }
];
