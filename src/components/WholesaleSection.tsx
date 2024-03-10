import WholesaleImage from '@/public/images/wholesale.webp';
import { Oleo_Script_Swash_Caps } from 'next/font/google';
import Link from 'next/link';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

export default function WholesaleSection() {
  return (
    <section className='w-full flex flex-col gap-5'>
      <h2 className={`text-center text-4xl font-semibold ${oleo.className}`}>Retailers</h2>
      <img src={WholesaleImage.src} alt='Wholesale for Retailers' className='rounded-lg shadow-lg' />
      <p className='text-xl text-center'>
        For those interested in becoming a retailer with our soaps please reach out to us by filling out the form at the
        link below!
      </p>
      <Link
        href={'/wholesale'}
        className={`w-full text-center rounded-lg bg-green-800 px-2 py-3 text-xl text-white transition-all duration-200 ease-in-out hover:bg-red-800 ${oleo.className}`}
      >
        {'Wholesae Interest'}
      </Link>
    </section>
  );
}
