import { createDollarAmount } from '@/utils/createDollarAmount';
import { Oleo_Script_Swash_Caps } from 'next/font/google';
import Link from 'next/link';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

interface Props {
  name: string;
  price: string;
  imgSrc: string;
  href: string;
}

export default function ProductCard({ name, price, imgSrc, href }: Props) {
  return (
    <Link
      href={href}
      className='p-5 flex h-full justify-start flex-col text-center gap-3 w-full rounded-lg hover:bg-mint group transition-all duration-200 ease-in-out'
    >
      <img
        className='w-full rounded-lg group-hover:opacity-75 group-hover:scale-105 transition-all duration-200 ease-in-out'
        src={imgSrc}
        alt={name}
      />
      <h2 className='text-2xl font-semibold'>{name}</h2>
      <p className='text-xl'>{createDollarAmount(price)}</p>
      <div className='flex-1' />
      <p
        className={`w-full text-cent px-2 py-3 rounded-lg bg-green-800 group-hover:bg-red-800 transition-all duration-200 ease-in-out text-xl text-white ${oleo.className}`}
      >
        Shop Now
      </p>
    </Link>
  );
}
