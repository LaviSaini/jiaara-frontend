'use client';

import { FormProvider, useForm } from 'react-hook-form';

import InputField from "@/components/general/InputField";
import { sendContactUsEmail } from '@/app/api/cms/nodeapi/DetailService';
import { useState } from 'react';
import { toast } from 'react-toastify';


export default function ContactForm({ className = "" }) {
  const [isSeding, setIsSending] = useState(false);
  const methods = useForm();
  const onSubmit = async (data) => {
    const requestObject = {
      "firstName": data?.firstname,
      "lastName": data?.lastname,
      "email": data?.email,
      "phone": data?.phone,
      "message": data?.message
    }
    setIsSending(true)
    const response = await sendContactUsEmail(requestObject);
    setIsSending(false)
    if (response?.response?.success) {
      toast('Mail has been sent successfully!', { type: 'success' })
    } else if (!response?.response?.success) {
      toast(`${response?.response?.message ? response?.response?.message : 'Something went Wrong!'}`, { type: 'error' })
    }
    methods.reset()
  };

  const assetsDirPath = `/assets/pages/contact-us`;

  return (
    <FormProvider {...methods}>
      <form
        className={`flex flex-col gap-5 ${className}`}
        onSubmit={methods.handleSubmit(onSubmit)}
      >

        <div className="flex justify-end">
          {/* <img src={`${assetsDirPath}/jiara-black.png`} alt="Jiara Logo" /> */}
        </div>
        <h2 className="font-content mb-3 text-3xl tracking-wide text-primaryFont ms-4">
          Have an enquiry?
        </h2>

        {/* <InputField
          input={{
            id: "first-name",
            className: "w-full px-3 py-2 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
            required: true,
            inputName: 'firstname'
          }}
          label={{
            className: "text-sm",
            text: "First Name",
            require: true
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
            className: "w-full px-3 py-2 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
            required: true,
            inputName: 'lastname'
          }}
          label={{
            className: "text-sm",
            text: "Last Name",
            require: true
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
            className: "w-full px-3 py-2 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
            required: true,
            inputName: 'email'
          }}
          label={{
            className: "text-sm",
            text: "Email Address",
            require: true
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
            id: "contact-number",
            type: "number",
            className: "w-full px-3 py-2 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
            min: 0,
            required: false,
            inputName: 'phone'
          }}
          label={{
            className: "text-sm",
            text: "Contact Number"
          }}
          validation={{
            isEnabled: true,
          }}
        />

        <InputField
          input={{
            id: "message",
            type: "textarea",
            inputName: "message",
            className: "w-full px-3 py-2 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
            rows: 5,
            required: true,
          }}
          label={{
            className: "text-sm",
            text: "Your Message",
            require: true
          }}
          validation={{
            isEnabled: true,
            messages: {
              required: "Message is required."
            }
          }}
        /> */}

        <div className="flex gap-4">
          <InputField
            input={{
              id: "first-name",
              className: "w-full px-3 py-1 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
              required: true,
              inputName: 'firstname'
            }}
            label={{
              className: "text-sm",
              text: "First Name",
              require: true
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
              className: "w-full px-3 py-1 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
              required: true,
              inputName: 'lastname'
            }}
            label={{
              className: "text-sm",
              text: "Last Name",
              require: true
            }}
            validation={{
              isEnabled: true,
              messages: {
                required: "Last Name is required."
              }
            }}
          />
        </div>

        <InputField
          input={{
            id: "email",
            type: "email",
            className: "w-full px-3 py-1 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
            required: true,
            inputName: 'email'
          }}
          label={{
            className: "text-sm",
            text: "Email Address",
            require: true
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
            id: "contact-number",
            type: "number",
            className: "w-full px-3 py-1 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
            min: 0,
            required: false,
            inputName: 'phone'
          }}
          label={{
            className: "text-sm",
            text: "Contact Number"
          }}
          validation={{
            isEnabled: true,
          }}
        />

        <InputField
          input={{
            id: "message",
            type: "textarea",
            inputName: "message",
            className: "w-full px-3 py-2 border rounded-md border-gray-500 input-selection-black focus:ring-black hover:ring-gray-700",
            rows: 2,
            required: true,
          }}
          label={{
            className: "text-sm",
            text: "Your Message",
            require: true
          }}
          validation={{
            isEnabled: true,
            messages: {
              required: "Message is required."
            }
          }}
        />
        <div className="flex justify-end">
          <button disabled={isSeding}
            className="font-contnet w-fit flex px-3 py-2 rounded-full text-sm bg-primaryFont text-white float-right"
            type="submit"
          >
            {isSeding ? 'Processing...' : 'Send Message'}
          </button>
        </div>
      </form>
    </FormProvider>

  );
}