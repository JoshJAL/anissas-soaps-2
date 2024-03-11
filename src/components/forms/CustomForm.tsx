'use client';

import { useState } from 'react';
import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import FormWrapper from './FormWrapper';
import { createCustomForm } from '@/actions/prisma';
import { sendCustomFormNotification } from '@/actions/nodemailer';

export default function CustomForm() {
  const [submitting, setSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!confirm('Are you sure you want to submit this form?')) return;
    setSubmitting(true);
    const success = await createCustomForm(
      formState.firstName.trim(),
      formState.lastName.trim(),
      formState.email.trim().toLowerCase(),
      formState.message.trim(),
      formState.phone.trim()
    );
    if (success) {
      await sendCustomFormNotification(
        formState.firstName.trim(),
        formState.lastName.trim(),
        formState.email.trim().toLowerCase(),
        formState.phone.trim(),
        formState.message.trim()
      );
      alert('Form Submitted Successfully');
      setFormState({
        phone: '',
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
      setSubmitting(false);
    } else {
      alert('Form Submission Failed, please try again');
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
        placeholder='1234567890'
        value={formState.phone}
        name='phone'
        onChange={(e) => handleChange(e)}
        label='Phone Number'
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
