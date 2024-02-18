interface Props {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export default function Select({ name, label, value, onChange, children }: Props) {
  return (
    <div>
      <label htmlFor={name} className='block font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <select
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          className='block w-full cursor-pointer rounded-md border-4 border-red-800 p-2 shadow-sm ring-1 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
        >
          {children}
        </select>
      </div>
    </div>
  );
}
