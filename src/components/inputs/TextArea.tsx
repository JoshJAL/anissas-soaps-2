interface Props {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ name, label, placeholder, value, onChange }: Props) {
  return (
    <div>
      <label htmlFor={name} className='block font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <textarea
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          className='block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
