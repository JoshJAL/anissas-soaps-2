'use client';

import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import FormWrapper from './FormWrapper';
import { useState } from 'react';

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Form submitted');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(e)} submitting={submitting} title='Contact Us'>
      <Input
        placeholder='Jane/John'
        value={formState.firstName}
        name='firstName'
        onChange={(e) => handleChange(e)}
        label='First Name'
      />
      <Input
        placeholder='Doe'
        value={formState.lastName}
        name='lastName'
        onChange={(e) => handleChange(e)}
        label='Last Name'
      />
      <Input
        placeholder='Anissa@AnissaSoaps.com``'
        value={formState.email}
        name='email'
        onChange={(e) => handleChange(e)}
        label='Email'
        type='email'
      />
      <TextArea
        placeholder='Thank you for visiting our website and taking the time to message us!'
        value={formState.message}
        name='message'
        onChange={(e) => handleChange(e)}
        label='Message'
      />
    </FormWrapper>
  );
}
