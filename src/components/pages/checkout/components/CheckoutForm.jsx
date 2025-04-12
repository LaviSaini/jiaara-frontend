'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useContext, useState } from 'react';

import { context } from "@/context-API/context";
import { storeData } from "@/context-API/actions/action.creators";

import { useForm, FormProvider } from 'react-hook-form';

import AutoSelect from '@/components/general/AutoSelect';
import InputField from '@/components/general/InputField';

import { createOrder } from "@/utils/functions/api/cms/woocommerce/orders";

import { ORDER } from '@/routes';

import { indianStates } from '@/utils/constants';
import { useSelector,useDispatch } from 'react-redux';
import { createOrderService, createPaymentOrder, finalCallService, verifyPaymentService } from '@/app/api/cms/nodeapi/DetailService';
import { toast } from 'react-toastify';

import { cart } from '@/redux/slices/cart';
import { coupon } from '@/redux/slices/coupon';
import Loader from '@/components/model/Loader';
import { loaderData } from '@/redux/slices/loader';

export default function CheckoutForm({ className = "", currentItems = [], clearItems = () => { } }) {

  const router = useRouter();
  const usedispatch=useDispatch();
  const { dispatch, data: { triggered } = {}, data: { objects } = {} } = useContext(context);

  const checkout = (triggered && objects?.checkout) || {};
  const [buttonMessage, setButtonMessage] = useState('Place Order')
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({ mode: "onChange" });
  const couponApplied = useSelector(data => data.couponSlice);
  const userData = useSelector(data => data.userDataSlice)
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const theOnSubmitCheckoutForm = async (data) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!userData) {
      router.push('/sign-in')
    }
    usedispatch(loaderData.add(true));
    if (scriptLoaded) {
      debugger
      const totalPriceArray = currentItems.map((element) => element.price * element.quantity);
      const productIds = currentItems.filter(data => data.inStock).map((element) => element?.product_id);
      let totalSum = totalPriceArray.reduce((acc, cur) => acc + cur, 0);
      let discount = 0;
      if (couponApplied) {
        if (couponApplied?.type == 'percent') {
          discount = Number(((totalSum * Number(couponApplied?.value)) / 100).toFixed(0));
        } else {
          discount = Number(couponApplied?.value)
        }
      }
      const obj = { amount: totalSum - discount, currency: "INR", userId: userData?.userId, productId: productIds }
      setButtonMessage('processing order...')
      setIsLoading(true);
      try {


        const response = await createPaymentOrder(obj);
        const orderId = response?.response?.data?.order_id
        // 2. Initialize Razorpay with the order data
        const options = {
          key: 'rzp_test_UvSPbsmSimh3H2', // Your Razorpay key ID
          amount: (totalSum - discount) * 100, // Amount in paise (e.g., 50000 paise = 500 INR)
          currency: 'INR',
          // name: 'Testing',
          // description: 'Test Transaction',// Optional: add your logo URL
          id: orderId, // Order ID received from the backend
          handler: function (response2) {
            // Success callback, handle success logic
            // setPaymentId(response.razorpay_payment_id)
            verifyPayment(response2.razorpay_payment_id, totalSum - discount, 'INR', response?.response?.data?.paymentId, data)
            // alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);

            // You can also send the payment details to your backend to verify the payment
            // verifyPayment(response);
          },
          prefill: {
            name: data?.firstName + " " + data?.lastName, // Prefill the user's name, email, etc.
            email: data?.email,
            contact: data?.contactNumber
          },
          theme: {
            color: '#F37254'
          }
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        toast("Something Went Wrong!", { type: 'error' })
        usedispatch(loaderData.clear())
      }
    } else {
      usedispatch(loaderData.clear())
      toast("Something Went Wrong!", { type: "error" })
    }
  }

  const verifyPayment = async (orderId, amount, currency, customPaymentId, data) => {
    setButtonMessage('verifying payment...')
    const requestObject = {
      amount: amount,
      payment_order_Id: orderId,
      currency: currency,
      customPaymentId: customPaymentId
    }

    usedispatch(loaderData.add(true));
    try {


      const response = await verifyPaymentService(requestObject);
      if (response?.response?.success) {
        const list = currentItems.map((element) => {
          return {
            product_id: element?.product_id,
            quantity: element?.quantity,
          }
        }
        )
        const coupontList = []
        if (couponApplied) {
          coupontList.push({ code: couponApplied?.title })
        }
        debugger
        let orderData = {
          payment_method: "Razorpay",
          payment_method_title: "Razor Pay",
          set_paid: true,
          customer_id: userData?.userId,
          status: 'completed',
          billing: {
            first_name: data.firstName,
            last_name: data.lastName,
            address_1: data.address,
            city: data.city,
            state: data.state,
            postcode: data.pinCode,
            country: "IN",
            email: data.email,
            phone: data.contactNumber
          },
          shipping: {
            first_name: data.firstName,
            last_name: data.lastName,
            address_1: data.address,
            city: data.city,
            state: data.state,
            postcode: data.pinCode,
            country: 'IN',
            phone:data.contactNumber
          },
          line_items: list,
          coupon_lines: coupontList
        };
        try {
          setButtonMessage('creating order...')
          const response = await createOrderService(orderData);
          if (response?.status == '201') {
            const req = {
              userId: userData?.userId, orderId: response?.data?.id, customPaymentId: customPaymentId
            }
            debugger
            const finalResponse = await finalCallService(req);
            debugger
            if (finalResponse?.response?.success) {
              try{

              
              toast('Order Placed Successfully', { type: 'success' })
              localStorage.setItem('id', response?.data?.id)
              usedispatch(cart.addAll([]))
              usedispatch(coupon.clear())
              usedispatch(loaderData.clear())
              router.push('/thankyou')
              }catch(error){
                  console.log(error)
              }
            } else {
              usedispatch(loaderData.clear())
              toast('Please reach to support! Something went Wrong!', { type: 'error' })
              router.push('/')

            }
          } else {
            usedispatch(loaderData.clear())
            toast('Something Went Wrong!', { type: "error" })
          }
        } catch (error) {
          usedispatch(loaderData.add(false));
          if (error?.response?.data?.data?.status == 400) {
            toast(error?.response?.data?.message, { type: 'error' })
          } else {
            toast("Something Went Wrong!")
          }
        }
      } else {
        usedispatch(loaderData.add(false));
        toast("Something went wrong!", { type: 'error' })
      }
    } catch (error) {
      usedispatch(loaderData.add(false));
      toast("Something went wrong!", { type: 'error' })
    }


  }
  useEffect(() => {
    console.log("Cart list", currentItems)

  }, [])
  useEffect(() => {

    function storeComponentData() {

      const haveErrors = Object.keys(methods?.formState?.errors || {})?.length > 0;

      dispatch(
        storeData({
          checkout: {
            ...checkout,
            haveErrors,
            onSubmitCheckoutForm: methods?.handleSubmit(theOnSubmitCheckoutForm)
          }
        }, "objects")
      );
    }

    storeComponentData();

  }, [methods?.formState?.errors]);


  return (
    <FormProvider {...methods}>
      <form
        id="the-checkout-form"
        className={`checkout-form flex flex-col gap-10 px-[8vw] ${className}`}
        onSubmit={methods?.handleSubmit(theOnSubmitCheckoutForm)}
      >
        <div className="form-group flex flex-col gap-5">
          <div className="form-group-heading text-xl text-primaryFont sm:text-2xl">
            Contact Information
          </div>

          <InputField
            input={{
              id: "first-name",
              inputName: "firstName",
              className: "w-full px-3 py-2 border rounded-md border-quaternaryBackground input-selection-primaryFont focus:ring-primaryFont hover:ring-secondaryBackground",
              required: true
            }}
            label={{
              className: "text-sm text-primaryFont",
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
              inputName: "lastName",
              className: "w-full px-3 py-2 border rounded-md border-quaternaryBackground input-selection-primaryFont focus:ring-primaryFont hover:ring-secondaryBackground",
              required: true
            }}
            label={{
              className: "text-sm text-primaryFont",
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
              inputName: "email",
              type: "email",
              className: "w-full px-3 py-2 border rounded-md border-quaternaryBackground input-selection-primaryFont focus:ring-primaryFont hover:ring-secondaryBackground",
              required: true
            }}
            label={{
              className: "text-sm text-primaryFont",
              text: "Email"
            }}
            validation={{
              isEnabled: true,
              messages: {
                required: "Email is required.",
                invalidEmail: "Invalid email address."
              }
            }}
          />

          <InputField
            input={{
              id: "contact-number",
              inputName: "contactNumber",
              type: "number",
              className: "w-full px-3 py-2 border rounded-md border-quaternaryBackground input-selection-primaryFont focus:ring-primaryFont hover:ring-secondaryBackground",
              min: 0,
              required: true,
              minLength: 10,
              maxLength: 13
            }}
            label={{
              className: "text-sm text-primaryFont",
              text: "Contact Number"
            }}
            validation={{
              isEnabled: true,
              messages: {
                required: "Contact Number is required.",
                minLength: "Below minimum length",
                maxLength: "Exceeds maximum length",
                min: "Value is too low."
              }
            }}
          />
        </div>

        <div className="form-group flex flex-col gap-5">

          <div className="form-group-heading text-xl text-primaryFont sm:text-2xl">
            Delivery Information
          </div>

          <InputField
            input={{
              id: "address",
              inputName: "address",
              className: "w-full px-3 py-2 border rounded-md border-quaternaryBackground input-selection-primaryFont focus:ring-primaryFont hover:ring-secondaryBackground",
              required: true
            }}
            label={{
              className: "text-sm text-primaryFont",
              text: "Address"
            }}
            validation={{
              isEnabled: true,
              messages: {
                required: "Address is required."
              }
            }}
          />

          <InputField
            input={{
              id: "additional-address",
              inputName: "additionalAddress",
              className: "w-full px-3 py-2 border rounded-md border-quaternaryBackground input-selection-primaryFont focus:ring-primaryFont hover:ring-secondaryBackground",
            }}
            label={{
              className: "text-sm text-primaryFont",
              text: "Apartment, suit, etc."
            }}
          />

          <InputField
            input={{
              id: "city",
              inputName: "city",
              className: "w-full px-3 py-2 border rounded-md border-quaternaryBackground input-selection-primaryFont focus:ring-primaryFont hover:ring-secondaryBackground",
              required: true
            }}
            label={{
              className: "text-sm text-primaryFont",
              text: "City"
            }}
            validation={{
              isEnabled: true,
              messages: {
                required: "City is required."
              }
            }}
          />

          <AutoSelect
            className="w-full"
            input={{
              id: "states-auto-select",
              inputName: "state",
              className: "w-[inherit] border rounded-md p-3 text-sm border-quaternaryBackground input-selection-primaryFont hover:ring-secondaryBackground focus:ring-primaryFont",
              placeholder: "Select State",
              autoComplete: "off",
              required: true,
            }}
            label={{
              className: "text-sm text-primaryFont",
              text: "State"
            }}
            options={indianStates}
            dropdownClassName="max-h-[16rem] border rounded overflow-y-auto text-sm border-quaternaryBackground bg-white"
            optionClassName={{
              hover: "hover:bg-quinaryBackground",
              selection: "bg-primaryFont text-white hover:text-white"
            }}
            validation={{
              isEnabled: true,
              messages: {
                required: "State is required."
              }
            }}
          />

          <InputField
            input={{
              id: "pin-code",
              inputName: "pinCode",
              className: "w-full px-3 py-2 border rounded-md border-quaternaryBackground input-selection-primaryFont focus:ring-primaryFont hover:ring-secondaryBackground",
              type: "number",
              min: 0,
              required: true
            }}
            label={{
              className: "text-sm text-primaryFont",
              text: "PIN Code"
            }}
            validation={{
              isEnabled: true,
              messages: {
                required: "PIN Code is required.",
                min: "Value is too low."
              }
            }}
          />
        </div>
      </form>
      

    </FormProvider>
  );
}
