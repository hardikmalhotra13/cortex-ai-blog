import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient(); // ✅ FIXED

  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles(email, role)')
    .eq('post_id', params.id)
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient(); // ✅ FIXED

  const body = await request.json();
  
  const { data, error } = await supabase
    .from('comments')
    .insert({ ...body, post_id: params.id })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}