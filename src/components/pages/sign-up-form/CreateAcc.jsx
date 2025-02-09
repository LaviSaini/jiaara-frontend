// import '.../'
// import FormHeader from "../layout/form-header/FormHeader";
'use client';
import InputField from "@/components/general/InputField";
import '../../../styles/singnupform.css';
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createAccountService } from "@/app/api/cms/nodeapi/DetailService";
import { toast } from "react-toastify";
import Icon from "@/components/general/Icon";

export default function CreatePass() {
  const methods = useForm();
  const [agreement, setAgreement] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false)
  const onSubmit = async (data) => {
    console.log(data)
    if (isLoading) {
      return;
    }
    const requestObject = {
      first_name: data?.firstName,
      last_name: data?.LastName,
      email: data?.email,
      password: data?.newpassword
    }
    if (!agreement) {
      setShowError(true);
      return;
    }
    setIsLoading(true);
    console.log(requestObject)
    console.log(agreement)
    const response = await createAccountService(requestObject);
    console.log(response)
    if (response?.response?.success) {
      toast(`${response?.response?.message}`, { type: 'success' })
      methods.reset()
      setAgreement(false)
    } else {
      toast(`${response?.response?.message}`, { type: 'error' })
    }
    setIsLoading(false)

  }
  return (
    <>
      <div className="mt-12 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-medium text-center mb-4">Create an account</h1>
          {/* <div class="flex justify-center gap-4 mb-6">
            <button class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google" class="w-6 h-6" />
            </button>
            <button class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" class="w-6 h-6" />
            </button>
            <button class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" class="w-5 h-6" />
            </button>
          </div> */}
          <FormProvider {...methods}>

            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-7 create-pass-form">
              {/* <div class="relative flex items-center justify-center mb-6">
                <div class="absolute inset-x-0 h-px bg-gray-300"></div>
                <span class=" relative bg-white px-3 text-gray-500">Or</span>
              </div> */}
              <p className="text-center text-sm">Sign up with email</p>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <InputField
                  input={{
                    id: "first-name",
                    className: "w-full px-3 py-1 border rounded-md border-gray-300 input-selection-black",
                    required: true,
                    inputName: 'firstName'
                  }}
                  label={{
                    className: "text-sm font-normal text-gray-700",
                    text: "First Name",
                    require: false
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
                    id: "Last-name",
                    className: "w-full px-3 py-1 border rounded-md border-gray-300 input-selection-black",
                    required: true,
                    inputName: 'LastName'
                  }}
                  label={{
                    className: "text-sm font-normal text-gray-700",
                    text: "Last Name",
                    require: false
                  }}
                  validation={{
                    isEnabled: true,
                    messages: {
                      required: "Last Name is required."
                    }
                  }}
                />
              </div>
              <div>
                <InputField
                  input={{
                    id: "Email Address",
                    className: "w-full px-3 py-1 border rounded-md border-gray-300 input-selection-black",
                    required: true,
                    type: 'email',
                    inputName: 'email'
                  }}
                  label={{
                    className: "text-sm font-normal text-gray-700",
                    text: "Email Address",
                    require: false
                  }}
                  validation={{
                    isEnabled: true,
                    messages: {
                      required: "Email Address is required."
                    }
                  }}
                />
              </div>
              <div className="relative">

                <InputField
                  input={{
                    id: "new-password",
                    className: "w-full px-3 py-1 border rounded-md border-gray-300 input-selection-black",
                    required: true,
                    inputName: 'newpassword',
                    type: isVisible ? 'text' : 'password'

                  }}
                  label={{
                    className: "text-sm font-normal text-gray-700",
                    text: "New password",
                    require: false
                  }}
                  validation={{
                    isEnabled: true,
                    messages: {
                      required: "Password is required."
                    }
                  }}
                />
                <Icon className="absolute size-[15px] right-[11px] bottom-[11px]" icon={`/assets/icons/${!isVisible ? 'eye' : 'hidden'}.png`} onClick={() => setIsVisible(!isVisible)} />
              </div>
              <div class="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex align-content-center justify-content-lg-start">
                  <input type="checkbox" value={agreement} onChange={(e) => { setAgreement(e.target.checked); e.target.checked ? setShowError(false) : setShowError(true) }} id="terms" class="h-3 w-3 text-indigo-600 rounded focus:ring-indigo-500" />
                  <label htmlFor="terms" class="ml-2  text-gray-600" style={{ fontSize: '8px' }}>I agree to all terms and privacy policy</label>
                </div>

                <button
                  className="w-40 text-white text-sm font-medium py-3 rounded-full bg-primaryFont"
                >
                  {!isLoading ? 'Sign Up' : 'processing...'}
                </button>
              </div>
              {
                showError ?
                  <span className="error text-red-500 text-xs">Please accept the agreement</span>
                  : ''
              }
              <div className="flex justify-center" style={{ marginTop: '25px', marginBottom: '10px' }}>
                <span className="text-sm text-gray-700">Already have an account <Link className="text-blue-700" href={'/sign-in'}>Sign In</Link></span>
              </div>
            </form>
          </FormProvider>

        </div>
      </div>

    </>
  );
}