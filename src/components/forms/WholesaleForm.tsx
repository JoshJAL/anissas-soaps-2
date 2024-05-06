'use client';

import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import FormWrapper from './FormWrapper';

import { sendWholesaleFormNotification } from '@/actions/nodemailer';
import { createWholesaleInterest } from '@/actions/turso/customer';
import { useState } from 'react';

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!confirm('Are you sure you want to submit?')) return;
    setSubmitting(true);
    const success = await createWholesaleInterest(
      formState.firstName,
      formState.lastName,
      formState.email,
      formState.phone,
      formState.businessName,
      formState.message
    );

    if (success) {
      await sendWholesaleFormNotification(
        formState.firstName.trim(),
        formState.lastName.trim(),
        formState.email.trim().toLowerCase(),
        formState.phone.trim(),
        formState.message.trim(),
        formState.businessName.trim()
      );
      alert('Thank you for your interest! We will be in touch soon.');
      setFormState({
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        phone: '',
        message: ''
      });
      setSubmitting(false);
    } else {
      alert('There was an error submitting your form. Please try again later.');
      setSubmitting(false);
    }
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
