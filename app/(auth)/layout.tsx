import '../globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Diverse Stem',
  description: 'Find your next big move',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-background text-foreground'>
        <main className='flex flex-col items-center min-h-screen'>
          {children}
        </main>
      </body>
    </html>
  );
}
