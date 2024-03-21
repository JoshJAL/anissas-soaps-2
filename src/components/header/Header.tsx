import { Oleo_Script_Swash_Caps } from 'next/font/google';
import Link from 'next/link';
import { FaBookOpen, FaSoap, FaWarehouse } from 'react-icons/fa';
import { IoMail, IoStorefront } from 'react-icons/io5';
import { CartButton } from './CartButton';
import CartFlyout from '@/app/cart/CartFlyout';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

export default function Header() {
  return (
    <header className='fixed bottom-0 z-50 h-fit w-full p-5 md:top-0'>
      <CartFlyout />
      <nav className='mx-auto flex w-full max-w-7xl items-center justify-between'>
        <Link className='group hidden md:inline-flex' href={'/'}>
          <Logo />
        </Link>
        <div className='bg-mint/85 flex w-full items-center justify-between rounded-lg px-3 py-4 backdrop-blur-md md:w-fit md:justify-center md:gap-8'>
          <HeaderLink href='/contact'>
            <IoMail className='h-6 w-6' />
            <p className='text-xs md:text-sm'>Contact</p>
          </HeaderLink>
          <HeaderLink href='/custom'>
            <FaSoap className='h-6 w-6' />
            <p className='hidden text-xs md:inline-flex md:text-sm'>Custom Soaps</p>
            <p className='text-xs md:hidden md:text-sm'>Custom</p>
          </HeaderLink>
          <HeaderLink href='/wholesale'>
            <FaWarehouse className='h-6 w-6' />
            <p className='text-xs  md:text-sm'>Wholesale</p>
          </HeaderLink>
          <HeaderLink href='/our-story'>
            <FaBookOpen className='h-6 w-6' />
            <p className='hidden text-xs md:inline-flex md:text-sm'>Our Story</p>
            <p className='text-xs md:hidden md:text-sm'>Story</p>
          </HeaderLink>
          <HeaderLink href='/shop'>
            <IoStorefront className='h-6 w-6' />
            <p className='text-xs md:text-sm'>Shop</p>
          </HeaderLink>
        </div>
        <CartButton />
      </nav>
    </header>
  );
}

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
  additionalClasses?: string;
}

function HeaderLink({ href, children, additionalClasses }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col flex-wrap items-center justify-center gap-1 text-center text-2xl transition-all duration-200 ease-in-out hover:scale-110 ${additionalClasses}`}
    >
      {children}
    </Link>
  );
}

function Logo() {
  return (
    <div
      className={`flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-red-800 bg-white text-xl transition-all duration-200 ease-in-out group-hover:rotate-12 group-hover:scale-110 ${oleo.className}`}
    >
      <p className='text-red-800'>Anissa&apos;s</p>
      <p className='text-green-800'>Soap</p>
    </div>
  );
}
