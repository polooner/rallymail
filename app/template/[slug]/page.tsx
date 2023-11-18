import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Page({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from('campaigns')
    .select()
    .eq('id', Number(params.slug))
    .single();
  console.log(data);
  console.log(params.slug);

  return (
    <div className='flex flex-col w-1/2 gap-8 mt-8 text-start space-8'>
      <h2>To: </h2>
      <h2>{data.email}</h2>
      <p>Title: </p>
      <h1 className='text-4xl font-bold'>{data.title}</h1>
      <h2 className='p-6 rounded-lg bg-neutral-100 '>{data.content}</h2>
    </div>
  );
}
