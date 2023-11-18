import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <main className='flex flex-col items-center min-h-screen'>
          <Toaster />
          <nav className='flex flex-row w-1/2 px-5 py-4 mt-6 text-md rounded-3xl bg-neutral-200 justify-evenly'>
            {/* TODO: make reusable */}
            <Link
              className='px-3 py-2 duration-300 bg-white hover:text-white hover:bg-neutral-800 rounded-xl'
              href='/'
            >
              Home
            </Link>
            <Link
              className='px-3 py-2 duration-300 bg-white hover:text-white hover:bg-neutral-800 rounded-xl'
              href='/create'
            >
              Create a template
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
