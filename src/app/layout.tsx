import './globals.css';

import Link from 'next/link';
import Loading from './loading';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

import { Inter, Oleo_Script_Swash_Caps } from 'next/font/google';
import { CartButtonMobile } from '@/components/header/CartButton';
import { Suspense } from 'react';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });
const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://www.anissasoaps.com'),
  title: "Anissaa's Soaps",
  description: 'Organic, hand-made soaps for any occasion!',
  icons: {
    icon: '/favicon.ico'
  }
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
          <div className='p-5 md:hidden flex justify-between'>
            <Link className='group' href={'/'}>
              <Logo />
            </Link>
            <CartButtonMobile />
          </div>
          <Header />
          <main className='p-5 w-full flex flex-col max-w-7xl mx-auto md:pt-36'>{children}</main>
          <div className='flex-1' />
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}

function Logo() {
  return (
    <div
      className={`flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-red-800 bg-white text-lg transition-all duration-200 ease-in-out group-hover:rotate-12 group-hover:scale-110 ${oleo.className}`}
    >
      <p className='text-red-800'>Anissa&apos;s</p>
      <p className='text-green-800'>Soap</p>
    </div>
  );
}
