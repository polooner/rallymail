import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const data = await supabase.auth.getUser();
  return NextResponse.json({ data: data.data.user?.id }, { status: 201 });
}
