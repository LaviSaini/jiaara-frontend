"use client"
// import '.../'
// import FormHeader from "../layout/form-header/FormHeader";
import InputField from "@/components/general/InputField";
import '../../../styles/signupform.css';
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { updatePasswordService } from "@/app/api/cms/nodeapi/DetailService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Icon from "@/components/general/Icon";
import ButtonInnerLoader from "@/components/general/ButtonInnerLoader";
export default function CreatePass({ email }) {
  const method = useForm();
  const router = useRouter();
  const [isSame, setIsSame] = useState(false);
  const [isVisibleFirst, setIsVisibleFirst] = useState(false);
  const [isVisibleSecond, setIsVisibleSecond] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const onSubmit = async (data) => {
    if (isProcessing) return;
    if (data?.confirmpassword != data?.newpassword) {
      setIsSame(true);
      return;
    }

    setIsSame(false)
    setIsProcessing(true);
    const response = await updatePasswordService(email, data?.confirmpassword);
    setIsProcessing(false);
    if (response?.response?.success) {
      toast(`${response?.response?.message}`, { type: "success" });
      router.push('/sign-in')
    } else {
      toast(`${response?.response?.message}`, { type: 'error' })
    }
  }
  return (
    <>
      <div className="mt-12 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-medium text-center mb-4">Create new password</h1>
          <p className="text-center text-gray-600 text-sm mb-6 mx-8">
            Your new password must be different from previously used password.
          </p>
          <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit)} className="space-y-7 create-pass-form">

              <div className="relative">

                <InputField
                  input={{
                    id: "new-password",
                    className: "w-full px-3 py-2 border rounded-md border-gray-300 input-selection-black",
                    required: true,
                    inputName: 'newpassword',
                    type: isVisibleFirst ? 'text' : 'password'

                  }}
                  label={{
                    className: "text-sm font-normal text-gray-700",
                    text: "New password",
                    require: false
                  }}
                  validation={{
                    isEnabled: true,
                    messages: {
                      required: "New password is required."
                    }
                  }}
                />
                <Icon className="absolute size-[15px] right-[11px] top-[42px]" icon={`/assets/icons/${!isVisibleFirst ? 'eye' : 'hidden'}.png`} onClick={() => setIsVisibleFirst(!isVisibleFirst)} />
              </div>
              <div className="relative">

                <InputField
                  input={{
                    id: "confirm-password",
                    className: "w-full px-3 py-2 border rounded-md border-gray-300 input-selection-black",
                    required: true,
                    inputName: 'confirmpassword',
                    type: isVisibleSecond ? 'text' : 'password'

                  }}
                  label={{
                    className: "text-sm font-normal text-gray-700",
                    text: "Confirm password",
                    require: false
                  }}
                  validation={{
                    isEnabled: true,
                    messages: {
                      required: "Confirm password is required."
                    }
                  }}
                />
                <Icon className="absolute size-[15px] right-[11px] top-[42px]" icon={`/assets/icons/${!isVisibleSecond ? 'eye' : 'hidden'}.png`} onClick={() => setIsVisibleSecond(!isVisibleSecond)} />
              </div>
              {
                isSame ?
                  <div className="error text-red-500 text-xs">
                    <span>New password and confirm password should be same.</span>
                  </div>
                  :
                  ''
              }

              <div class=" flex justify-center !mt-28 !mb-10">
                <button
                  className="w-40 text-white text-sm font-medium py-3 rounded-full bg-primaryFont flex justify-center"
                >
                  {isProcessing ? <ButtonInnerLoader /> : 'Save'}
                </button>
              </div>
            </form>
          </FormProvider>

        </div>
      </div>

    </>
  );
}