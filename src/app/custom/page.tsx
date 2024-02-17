import CustomForm from '@/components/forms/CustomForm';
import { Oleo_Script_Swash_Caps } from 'next/font/google';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

export default function Page() {
  return (
    <article className='flex flex-col gap-5'>
      <section className='w-full flex flex-col gap-3'>
        <h1 className='text-center text-3xl font-semibold'>
          Whatever the occasion, Mama Anissa will make the{' '}
          <span className={`${oleo.className} text-red-800`}>perfect</span> soaps to impress!
        </h1>
        <h2 className='text-2xl text-center'>Leave a Lasting Impression!</h2>
      </section>
      <section className='flex flex-col gap-3 bg-mint rounded-lg p-5'>
        <h2 className='text-2xl text-center'>Any Event, Any Size!</h2>
        <p className='text-center'>
          Baby Shower? Graduation? Class Reunion? Anissa can make any custom soap to your specification for any
          occasion!
        </p>
        <h2 className='text-2xl text-center'>Build It!</h2>
        <p className='text-center'>
          Please reach out to Anissa below to start the process of designing, picking the right scent, and figuring outt
          the timeline!
        </p>
      </section>
      <CustomForm />
    </article>
  );
}
