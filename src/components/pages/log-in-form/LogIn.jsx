// import '.../'
// import FormHeader from "../layout/form-header/FormHeader";
'use client';
import InputField from "@/components/general/InputField";
import './LogIn.css';
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { getCartListService, getWishListService, loginService } from "@/app/api/cms/nodeapi/DetailService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cart } from "@/redux/slices/cart";
import { wishlist } from "@/redux/slices/wishlist";
import { userdata } from "@/redux/slices/userdata";
import { useEffect, useState } from "react";
import useNavigationType from "@/utils/hooks/general/useNavigationType";
import { useRouter } from 'next/navigation'
import Icon from "@/components/general/Icon";
import { loaderData } from "@/redux/slices/loader";

export default function LogIn({ isPopUp, userlogin }) {
  const userData = useSelector(data => data.userDataSlice)
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter()
  const method = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log(data)
    dispatch(loaderData.add(true));
    const response = await loginService(data);
    dispatch(loaderData.add(false))
    if (response?.response?.success) {
      if (isPopUp) {
        userlogin(response?.response?.data)
        return;
      }
      dispatch(userdata.add({ userId: response?.response?.data?.id }));
      fetchCartList(response?.response?.data?.id);
      fetchWishList(response?.response?.data?.id)
      router.push('/')
    } else {
      console.log("false")
      toast(`${response?.response?.message}`, { type: 'error' })
    }
  }
  const fetchCartList = async (userId) => {

    const response = await getCartListService(userId);
    if (response?.response?.success) {
      if (response?.response?.data?.length > 0) {
        dispatch(cart.addAll(response?.response?.data))
      } else {
        dispatch(cart.addAll([]))
      }

    }
  }
  const fetchWishList = async (userId) => {

    const response = await getWishListService(userId);
    if (response?.response?.success) {
      if (response?.response?.data?.length > 0) {
        dispatch(wishlist.addAll(response?.response?.data))
      }
    }
  }
  useEffect(() => {
    if (userData) {

      router.push('/')
    }
  }, [])
  return (
    <>
      <div className="mt-12 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-medium text-center mb-4">Welcome</h1>
          <p className="text-center text-gray-600 text-sm mb-6 mx-8">
            LogIn to Your Account
          </p>
          <FormProvider {...method}>

            <form onSubmit={method.handleSubmit(onSubmit)} className="space-y-7 create-pass-form">
              <InputField
                input={{
                  id: "Email Address",
                  className: "w-full px-3 py-1 border rounded-md border-gray-300 input-selection-black",
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
              <div className="relative">

                <InputField
                  input={{
                    id: "password",
                    className: "w-full px-3 py-2 border rounded-md border-gray-300 input-selection-black",
                    required: true,
                    inputName: 'password',
                    type: isVisible ? 'text' : 'password'
                  }}
                  label={{
                    className: "text-sm font-normal text-gray-700",
                    text: "Password",
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
              <div className="text-blue-700" style={{ marginTop: '3px', cursor: 'pointer', display: 'flex', justifyContent: 'end', fontSize: '12px' }}>
                <div>
                  <Link href={'/forgot-password'}>Forgot Password?</Link>
                </div>
              </div>
              <div class=" flex justify-center !mt-28 !mb-10">
                <button

                  className="w-40 text-white text-sm font-medium py-3 rounded-full bg-primaryFont"
                >
                  Login
                </button>
              </div>
            </form>
          </FormProvider>

          <div className="flex justify-center" style={{ marginTop: '25px', marginBottom: '10px' }}>
            <span className="text-sm text-gray-700">
              {"Don't have an account"}
              <Link className="text-blue-700" href="/create-account">Sign Up</Link>
            </span>

          </div>
        </div>
      </div>

    </>
  );
}