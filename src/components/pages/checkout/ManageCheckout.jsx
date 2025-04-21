'use client';

import CheckoutForm from "@/components/pages/checkout/components/CheckoutForm";
import OrderSummary from "@/components/global/order-summary/OrderSummary";

import useClient from "@/utils/hooks/general/useClient";
import useCheckoutPageValidations from '@/utils/hooks/global/useCheckoutPageValidations';
import { current } from "@reduxjs/toolkit";


const ManageCheckout = () => {

  const isClient = useClient();

  const { currentItems, clearItems } = useCheckoutPageValidations();
  console.log(currentItems, clearItems)

  return (
    (isClient &&
      <>
        <CheckoutForm currentItems={currentItems} clearItems={clearItems} />
        <OrderSummary currentItems={currentItems} />

      </>
    )
  );
}

export default ManageCheckout;