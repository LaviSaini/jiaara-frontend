'use client';

import { useForm } from 'react-hook-form';

import InputField from '@/components/general/InputField';


export default function ByEmail({ className = "" }) {

  const onSubmit = data => {
    (data);
  };

  const { handleSubmit } = useForm();

  return (
    <form
      className={`auth-by-email w-[85%] flex flex-col justify-center gap-5 ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        input={{
          id: "first-name",
          className: "w-full px-3 py-2 rounded-md focus:ring-primaryFont hover:ring-secondaryBackground",
          required: true
        }}
        label={{
          className: "text-sm",
          text: "First Name"
        }}
        validation={{
          isEnabled: true,
          messages: {
            required: "First Name is required."
          }
        }}
      />

      <InputField
        input={{
          id: "last-name",
          className: "w-full px-3 py-2 rounded-md focus:ring-primaryFont hover:ring-secondaryBackground",
          required: true
        }}
        label={{
          className: "text-sm",
          text: "Last Name"
        }}
        validation={{
          isEnabled: true,
          messages: {
            required: "Last Name is required."
          }
        }}
      />

      <InputField
        input={{
          id: "email",
          type: "email",
          className: "w-full px-3 py-2 rounded-md focus:ring-primaryFont hover:ring-secondaryBackground",
          required: true
        }}
        label={{
          className: "text-sm",
          text: "Email"
        }}
        validation={{
          isEnabled: true,
          messages: {
            required: "Email is required."
          }
        }}
      />

      <InputField
        input={{
          id: "password",
          type: "password",
          className: "w-full px-3 py-2 rounded-md focus:ring-primaryFont hover:ring-secondaryBackground",
          required: true
        }}
        label={{
          className: "text-sm",
          text: "Password"
        }}
        validation={{
          isEnabled: true,
          messages: {
            required: "Password is required."
          }
        }}
      />

      <InputField
        input={{
          id: "confirm-password",
          type: "password",
          className: "w-full px-3 py-2 rounded-md focus:ring-primaryFont hover:ring-secondaryBackground",
          required: true
        }}
        label={{
          className: "text-sm",
          text: "Confirm Password"
        }}
        validation={{
          isEnabled: true,
          messages: {
            required: "Confirm Password is required."
          }
        }}
      />

      <InputField
        className="mt-2"
        input={{
          className: "accent-primaryFont",
          type: "checkbox",
          options: [
            {
              value: "terms-privacy",
              label: {
                className: "ms-2 text-xs",
                text: "I agree to all the terms and privacy policy."
              }
            }
          ]
        }}
        validation={{
          isEnabled: true,
          messages: {
            required: "You must agree to all the terms and privacy policy."
          }
        }}
      />

      <button className="py-2 mt-1 rounded-md text-white bg-primaryFont">
        Sign Up
      </button>
    </form>
  );
}
