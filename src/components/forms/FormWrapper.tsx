import { Oleo_Script_Swash_Caps } from 'next/font/google';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
  buttonText?: string;
  submittingText?: string;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
}

export default function FormWrapper({
  children,
  buttonText = 'Submit',
  submittingText = 'Submitting...',
  submitting,
  title,
  onSubmit
}: Props) {
  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      {title && <h1 className={`text-3xl font-bold text-center ${oleo.className}`}>{title}</h1>}
      {children}
      <button className='w-full bg-green-800 text-white px-2 py-3 rounded-lg hover:bg-red-800 transition-all duration-200 ease-in-out'>
        {submitting ? submittingText : buttonText}
      </button>
    </form>
  );
}
