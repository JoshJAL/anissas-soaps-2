import './globals.css';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Loading from './loading';

import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import type { Metadata } from 'next';

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
