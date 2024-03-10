'use client';

import { useState } from 'react';
import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import FormWrapper from './FormWrapper';

export default function WholesaleForm() {
  const [submitting, setSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
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
    <FormWrapper onSubmit={(e) => handleSubmit(e)} submitting={submitting} title='Wholesale Interest'>
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
        placeholder='ACME'
        value={formState.businessName}
        name='businessName'
        onChange={(e) => handleChange(e)}
        label='Business Name'
      />
      <Input
        placeholder='Anissa@AnissaSoaps.com'
        value={formState.email}
        name='email'
        onChange={(e) => handleChange(e)}
        label='Email'
        type='email'
      />
      <Input
        placeholder='9205550101'
        value={formState.phone}
        name='phone'
        onChange={(e) => handleChange(e)}
        label='Phone Number'
        type='number'
      />
      <TextArea
        placeholder='Let us know anything special about your business, that you think we should know before we talk!'
        value={formState.message}
        name='message'
        onChange={(e) => handleChange(e)}
        label='Message'
      />
    </FormWrapper>
  );
}
