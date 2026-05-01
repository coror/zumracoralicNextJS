'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ClipLoader } from 'react-spinners';

// Define the props type
interface FormSectionProps {
  message: string;
  errorMessage: string;
  successMessage: string;
  send:  string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FormSection({
  message,
  errorMessage,
  successMessage,
  send
}: FormSectionProps) {
  const initialFields = {
    name: '',
    email: '',
    message: '',
    website: '',
  };

  const [fields, setFields] = useState(initialFields);
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [messageValid, setMessageValid] = useState(true);
  const [formValid, setFormValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormValid(true);
    setSubmissionSuccess(false);

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setNameValid(value.trim() !== '');
    } else if (name === 'email') {
      setEmailValid(emailRegex.test(value));
    } else if (name === 'message') {
      setMessageValid(value.trim() !== '');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const isValid = validateAllFields();
    if (!isValid) {
      setFormValid(false);
      return;
    }

    setFormValid(true);
    setLoading(true);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      });

      const result = await response.json();
      if (result.success) {
        setSubmissionSuccess(true);
        setFields(initialFields);
      } else {
        setFormValid(false);
        console.error('Submission failed:', result.error);
      }
    } catch (error) {
      setFormValid(false);
      console.error('Error submitting form', error);
    } finally {
      setLoading(false);
    }
  };

  const validateAllFields = () => {
    const isNameValid = fields.name.trim() !== '';
    const isEmailValid = emailRegex.test(fields.email);
    const isMessageValid = fields.message.trim() !== '';

    setNameValid(isNameValid);
    setEmailValid(isEmailValid);
    setMessageValid(isMessageValid);

    return isNameValid && isEmailValid && isMessageValid;
  };

  return (
    <div className='bg-white p-8 md:p-10 w-full rounded-2xl shadow-[0_25px_50px_-15px_rgba(34,36,40,0.18)] text-left'>
      <form className='space-y-6 text-[#222428]' onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor='name'
            className='block text-[10px] tracking-[0.25em] uppercase text-[#222428]/65 mb-2'
          >
            IME
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className={`block w-full px-4 py-3 bg-transparent border ${
              nameValid ? 'border-[#222428]/15' : 'border-red-500'
            } rounded-xl focus:outline-none focus:ring-1 focus:ring-[#df650e] focus:border-[#df650e] transition-colors`}
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='block text-[10px] tracking-[0.25em] uppercase text-[#222428]/65 mb-2'
          >
            E-POŠTA
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className={`block w-full px-4 py-3 bg-transparent border ${
              emailValid ? 'border-[#222428]/15' : 'border-red-500'
            } rounded-xl focus:outline-none focus:ring-1 focus:ring-[#df650e] focus:border-[#df650e] transition-colors`}
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label
            htmlFor='message'
            className='block text-[10px] tracking-[0.25em] uppercase text-[#222428]/65 mb-2'
          >
            {message}
          </label>
          <textarea
            id='message'
            name='message'
            rows={5}
            className={`block w-full px-4 py-3 bg-transparent border ${
              messageValid ? 'border-[#222428]/15' : 'border-red-500'
            } rounded-xl focus:outline-none focus:ring-1 focus:ring-[#df650e] focus:border-[#df650e] transition-colors resize-none`}
            value={fields.message}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
        </div>
        <div
          aria-hidden='true'
          style={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <label htmlFor='website'>Website</label>
          <input
            type='text'
            id='website'
            name='website'
            tabIndex={-1}
            autoComplete='off'
            value={fields.website}
            onChange={handleChange}
          />
        </div>
        <div className='text-center'>
          <button
            type='submit'
            className='btn-primary disabled:opacity-60 disabled:cursor-not-allowed'
            disabled={loading}
          >
            {loading ? <ClipLoader size={24} color='#ffffff' /> : `${send}`}
          </button>
          {!formValid && (
            <p className='text-red-500 mt-3 text-center'>{errorMessage}</p>
          )}
          {submissionSuccess && formValid && (
            <p className='mt-4 text-green-500'>{successMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}
