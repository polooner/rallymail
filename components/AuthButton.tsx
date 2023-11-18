import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect('/');
  };

  return user ? (
    <div className='flex items-center gap-4'>
      <form action={signOut}>
        <button className='px-3 py-2 duration-300 bg-white hover:text-white hover:bg-neutral-800 rounded-xl'>
          Logout
        </button>
        <span className='ml-2'>Hey, {user.email}!</span>
      </form>
    </div>
  ) : (
    <Link
      href='/login'
      className='px-3 py-2 duration-300 bg-white hover:text-white hover:bg-neutral-800 rounded-xl'
    >
      Sign Up to create
    </Link>
  );
}
