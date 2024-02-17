import Soap from '@/public/images/aBarOfSoap.webp';
import Anissa from '@/public/images/anissaHoldingSoap.webp';
import { Oleo_Script_Swash_Caps } from 'next/font/google';
import Link from 'next/link';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

export default function WhoWeAre() {
  return (
    <section className='grid md:grid-cols-2 items-start gap-5'>
      <h2 className={`${oleo.className} text-center md:col-span-2 text-4xl`}>A Bar Above the Rest</h2>
      <Info
        linkText='Our Story'
        href='/our-story'
        imgSrc={Anissa.src}
        title='Traditionally Handmade!'
        info="Every bar of Anissa's Soap is <b><i>handmade</i></b> by Anissa herself, in the traditional Lebanese fashion which was passed on to her. With her delicate means of production and proper care, every bar of soap is a delight!"
      />
      <Info
        linkText='Shop Now'
        href='/shop'
        imgSrc={Soap.src}
        title='All Natural and Organic!'
        info="Every single one of Anissa's soaps is made with the same base of <b><i>natural and organic</i></b> ingredients every time: <b>Extra Virgin Olive Oil, Water, Lye & The Scent of Your Choice</b>"
      />
    </section>
  );
}

interface InfoProps {
  title: string;
  info: string;
  imgSrc: string;
  linkText: string;
  href: string;
}

function Info({ title, info, imgSrc, href, linkText }: InfoProps) {
  return (
    <div className='w-full h-full flex flex-col items-center justify-start text-center gap-3'>
      <div className='overflow-hidden flex items-center justify-center h-72 rounded-lg'>
        <img src={imgSrc} alt={title} className='w-full' />
      </div>
      <h3 className={`text-2xl font-bold ${oleo.className}`}>{title}</h3>
      <p className='text-xl' dangerouslySetInnerHTML={{ __html: info }} />
      <div className='flex-1' />
      <Link
        href={href}
        className={`w-full px-2 py-3 rounded-lg text-xl bg-green-800 hover:bg-red-800 transition-all duration-200 ease-in-out text-white ${oleo.className}`}
      >
        {linkText}
      </Link>
    </div>
  );
}
