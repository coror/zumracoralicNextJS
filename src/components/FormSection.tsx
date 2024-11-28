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
        setLoading(false);
        setSubmissionSuccess(true);
        setFields(initialFields);
      } else {
        setLoading(false);
        setFormValid(false);
        console.error('Submission failed:', result.error);
      }
    } catch (error) {
      setLoading(false);
      setFormValid(false);
      console.error('Error submitting form', error);
    }

      setLoading(false);
      setSubmissionSuccess(true);
      // Simulate a form submission or do actual submission here

      // Reset fields after successful submission
      setFields(initialFields);
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
    <div className='bg-white p-8 w-full  rounded-md  mb-20  shadow-2xl shadow-[#df650e] text-left'>
      {/* <h2 className='text-2xl font-bold mb-4 text-center text-black'>
        Piši mi
      </h2> */}
      <form className='space-y-4 text-black' onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            IME
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className={`mt-1 block w-full p-2 border ${
              nameValid ? 'border-gray-300' : 'border-red-500'
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            E-POŠTA
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className={`mt-1 block w-full p-2 border ${
              emailValid ? 'border-gray-300' : 'border-red-500'
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700 uppercase'
          >
            {message}
          </label>
          <textarea
            id='message'
            name='message'
            rows={4}
            className={`mt-1 block w-full p-2 border ${
              messageValid ? 'border-gray-300' : 'border-red-500'
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            value={fields.message}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
        </div>
        <div className='text-center'>
          <button
            type='submit'
            className='bg-[#FFE6BC] px-5 py-4 md:px-6 md:py-3 text-sm md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#b7905b]'
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
