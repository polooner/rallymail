import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import AuthButton from '@/components/AuthButton';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'RallyMail',
  description: 'Amplify Your Voice, Unite for Change',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();
  console.log(user.data.user);
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <main className='flex flex-col items-center min-h-screen'>
          <Toaster />
          <nav className='flex flex-row w-4/5 px-5 py-4 mt-6 sm:w-1/2 text-md rounded-3xl bg-neutral-200 justify-evenly'>
            {/* TODO: make reusable */}
            <Link
              className='px-3 py-2 duration-300 bg-white hover:text-white hover:bg-neutral-800 rounded-xl'
              href='/'
            >
              Home
            </Link>
            {user.data.user ? (
              <Link
                className='px-3 py-2 duration-300 bg-white hover:text-white hover:bg-neutral-800 rounded-xl'
                href='/create'
              >
                Create a template
              </Link>
            ) : null}

            <AuthButton />
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
