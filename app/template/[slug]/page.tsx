import { Button } from '@/components/ui/button';
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
      <p>To: </p>
      <h2>{data.email}</h2>
      <p>Subject: </p>
      <h1 className='text-4xl font-bold'>{data.title}</h1>
      <p>Content:</p>
      <h2 className='p-6 rounded-lg bg-neutral-100 text-'>{data.content}</h2>
      {/* TODO: make reusable a tag button */}
      <a
        href={`mailto:${data.email}?subject=${data.title}&body=${data.content}`}
        className='inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
      >
        Send it &rarr;
      </a>
    </div>
  );
}
