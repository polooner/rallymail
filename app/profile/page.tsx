import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: user } = await supabase.auth.getUser();
  const { data: templates } = await supabase
    .from('templates')
    .select()
    .eq('userID', user.user?.id);

  return (
    <section>
      <div>{templates}</div>
    </section>
  );
}
