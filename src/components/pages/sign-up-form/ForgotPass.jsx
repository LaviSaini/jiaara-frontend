// import '.../'
// import FormHeader from "../layout/form-header/FormHeader";

"use client"
import InputField from "@/components/general/InputField";
import '../../../styles/signupform.css';
import { FormProvider, useForm } from "react-hook-form";
import { sendCodeService } from "@/app/api/cms/nodeapi/DetailService";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";
import VerifyMail from "./VerifyMail";
import ButtonInnerLoader from "@/components/general/ButtonInnerLoader";

export default function ForgotPass() {
  const method = useForm();
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [useremail, setuseremail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const onSubmit = async (data) => {
    setuseremail(data?.email)
    if (isSending) return;
    setIsSending(true);
    const response = await sendCodeService(data?.email);
    setIsSending(false);
    if (response?.response?.success) {
      toast(`${response?.response?.message}`, { type: 'success' })
      setIsOTPSend(true)
    } else {
      toast(`${response?.response?.message}`, { type: 'error' })
    }
  }
  return (
    <>
      {
        !isOTPSend ?
          <div className="mt-12 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
              <h1 className="text-2xl font-medium text-center mb-4">Forgot password?</h1>
              <FormProvider {...method}>

                <form onSubmit={method.handleSubmit(onSubmit)} className="space-y-7 forgot-pass-form" style={{ marginTop: '20px', marginInline: '20px' }}>
                  <InputField
                    input={{
                      id: "Email Address",
                      className: "w-full px-3 py-2 border rounded-md border-gray-300 input-selection-black",
                      required: true,
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
                  <div class=" flex justify-center !mt-18 send-c-btn">
                    <button
                      className="w-40 text-white text-sm font-medium py-3 rounded-full bg-primaryFont flex justify-center"
                    >
                      {!isSending ? 'Send Code' : <ButtonInnerLoader />}
                    </button>

                  </div>
                  <div className="flex justify-center" style={{ marginTop: '130px', marginBottom: '30px' }}>
                    <span className="text-sm text-gray-700">Remember Password? <Link href={'/sign-in'} className="text-blue-700">Login</Link></span>
                  </div>
                </form>
              </FormProvider>

            </div>
          </div>
          :
          <VerifyMail email={useremail} />
      }


    </>
  );
}