import { Oleo_Script_Swash_Caps } from 'next/font/google';
import Link from 'next/link';
import { FaBookOpen, FaSoap } from 'react-icons/fa';
import { IoHome, IoMail, IoStorefront } from 'react-icons/io5';
import { CartButton, CartButtonMobile } from './CartButton';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

export default function Header() {
  return (
    <header className='w-full fixed md:top-0 bottom-0 p-5 z-50'>
      <nav className='w-full max-w-7xl mx-auto flex items-center justify-between'>
        <Link className='group hidden md:inline-flex' href={'/'}>
          <Logo />
        </Link>
        <div className='bg-mint/85 backdrop-blur-md px-3 py-4 rounded-lg flex justify-between md:gap-8 items-center w-full md:w-fit md:justify-center'>
          <HeaderLink href='/' additionalClasses='md:hidden'>
            <IoHome className='w-6 h-6' />
            <p className='text-xs md:text-sm'>Home</p>
          </HeaderLink>
          <HeaderLink href='/contact'>
            <IoMail className='w-6 h-6' />
            <p className='text-xs md:text-sm'>Contact</p>
          </HeaderLink>
          <HeaderLink href='/custom'>
            <FaSoap className='w-6 h-6' />
            <p className='text-xs md:text-sm md:inline-flex hidden'>Custom Soaps</p>
            <p className='text-xs md:text-sm md:hidden'>Custom</p>
          </HeaderLink>
          <HeaderLink href='/our-story'>
            <FaBookOpen className='w-6 h-6' />

            <p className='text-xs md:text-sm md:inline-flex hidden'>Our Story</p>
            <p className='text-xs md:text-sm md:hidden'>Story</p>
          </HeaderLink>
          <HeaderLink href='/shop'>
            <IoStorefront className='w-6 h-6' />
            <p className='text-xs md:text-sm'>Shop</p>
          </HeaderLink>
          <CartButtonMobile />
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
      className={`text-2xl hover:scale-110 items-center justify-center transition-all duration-200 ease-in-out flex flex-col gap-1 text-center flex-wrap ${additionalClasses}`}
    >
      {children}
    </Link>
  );
}

function Logo() {
  return (
    <div
      className={`rounded-full h-24 w-24 bg-white border-4 border-red-800 flex flex-col items-center justify-center text-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-200 ease-in-out ${oleo.className}`}
    >
      <p className='text-red-800'>Anissa&apos;s</p>
      <p className='text-green-800'>Soap</p>
    </div>
  );
}
