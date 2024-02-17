'use client';

import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import FormWrapper from './FormWrapper';
import { useState } from 'react';

export default function CustomForm() {
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
    <FormWrapper onSubmit={(e) => handleSubmit(e)} submitting={submitting} title="Let's Get in Touch">
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
        placeholder='Let me know what you are looking for!'
        value={formState.message}
        name='message'
        onChange={(e) => handleChange(e)}
        label='Needed Information and Questions'
      />
    </FormWrapper>
  );
}
