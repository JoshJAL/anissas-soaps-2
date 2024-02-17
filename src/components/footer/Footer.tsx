import { EMAIL, EMAIL_LINK } from '@/consts';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Footer() {
  return (
    <footer className='w-full bg-mint p-5 pb-36 md:pb-5'>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-5 text-center'>
        <p>&copy; Anissa&apos;s Soap {new Date().getFullYear()}</p>
        <Link href={EMAIL_LINK} className='hover:underline underline-offset-4'>
          {EMAIL}
        </Link>
      </div>
    </footer>
  );
}
