'use client';

import { useContext, useEffect, useState } from 'react';
import { context } from "@/context-API/context";
import { storeData } from "@/context-API/actions/action.creators";

import { FormProvider, useForm } from 'react-hook-form';

import { PiTagThin } from "react-icons/pi";

import InputField from "@/components/general/InputField";
import { useDispatch, useSelector } from 'react-redux';
import { coupon } from '@/redux/slices/coupon';
import { validateCouponService } from '@/app/api/cms/nodeapi/DetailService';


export default function CouponForm({ className = "" }) {
  const dispatch = useDispatch();
  const [isInValid, setIsInValid] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [message, setMessage] = useState('')
  const couponApplied = useSelector(data => data.couponSlice);

  const { control, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const method = useForm({
    mode: "onChange",
    defaultValues: {
      couponCode: couponApplied?.title || "",  // Set initial value if coupon is applied
    }
  });

  const onApplyCoupon = async (data) => {
    if (!isApplied) {
      const response = await validateCouponService(data?.couponCode);
      if (response?.message == "false") {
        setIsInValid(false)
        setMessage('Invalid Coupon!')
        dispatch(coupon.clear())
      } else {
        setIsInValid(true);
        setMessage(response?.details)
        setIsApplied(true)
        const obj = {
          details: response?.details,
          message: response?.message,
          type: response?.type,
          value: response?.value,
          title: data?.couponCode
        }
        dispatch(coupon.add(obj))
      }
    } else {
      dispatch(coupon.clear());
      method.reset({ couponCode: "" })
      setIsApplied(false)
      setMessage('')
    }

  }
  useEffect(() => {
    if (couponApplied) {
      setIsApplied(true)
      console.log(couponApplied)
      setValue('couponCode', couponApplied?.title)
      setMessage(couponApplied?.details)
      setIsInValid(true)
    } else {
      setValue('couponCode', '')
    }
  }, [couponApplied, setValue])

  return (
    <>
      <FormProvider {...method}>

        <form
          className={`coupon-form flex items-end gap-5 m-0`}
          onSubmit={method.handleSubmit(onApplyCoupon)}
        >
          <InputField
            className="w-full"
            input={{
              id: "coupon-code",
              inputName: "couponCode",
              className: "w-[inherit] ps-3 pe-10 py-3 rounded-md text-sm input-selection-primaryFont focus:ring-primaryFont hover:ring-secondaryBackground",
              placeholder: "e.g., SAVE50",
              value: '',
              icon: {
                className: "text-primaryFont",
                theIcon: <PiTagThin />
              }
            }}
            label={{
              className: "text-sm text-primaryFont",
              text: "Coupon Code"
            }}
            control={control}
          />
          <button
            type="submit"
            className="coupon-code-apply-btn rounded-md px-[7vw] py-3 text-sm uppercase text-white bg-primaryFont"
          >
            {!isApplied ? 'Apply' : 'Remove'}
          </button>
        </form>
        {
          !isInValid ?
            <span className={`error text-red-500 text-xs`}>{message}</span>
            :
            <div id='messageid' style={{ color: 'green', fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: message }}></div>
        }
      </FormProvider>

    </>

  );
}
