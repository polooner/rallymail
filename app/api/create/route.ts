import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = cookies();
  const json = await req.json();
  const supabase = createClient(cookieStore);
  const { error, status, data } = await supabase
    .from('campaigns')
    .insert(json)
    .select()
    .single();

  return NextResponse.json({ message: error, status, data: data.id });
}
