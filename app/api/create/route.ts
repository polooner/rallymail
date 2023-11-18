import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = cookies();
  const json = await req.json();
  console.log(json);
  const supabase = createClient(cookieStore);
  const { error, status, data } = await supabase.from('campaigns').insert(json);
  console.log(status);
  console.log(error);

  return Response.json({ status });
}
