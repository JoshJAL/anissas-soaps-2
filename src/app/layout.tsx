import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Anissaa's Soaps",
  description: 'Organic, hand-made soaps for any occasion!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <Header />
          <main className='p-5 w-full flex flex-col max-w-7xl mx-auto md:pt-36'>{children}</main>
          <div className='flex-1' />
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
