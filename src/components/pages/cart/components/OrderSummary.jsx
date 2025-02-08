import Link from 'next/link';

import CouponForm from "@/components/global/CouponForm";
import OrderCalculation from "@/components/global/order-summary/components/OrderCalculation";

import { CHECKOUT } from "@/routes";


export default function OrderSummary({ className = "", cartItems = [] }) {

  return (
    <div className={`cart-order-summary flex flex-col py-5 ${className}`}>
      <div className="heading text-xl text-primaryFont sm:text-2xl">
        Order Summary
      </div>

      <hr className="my-5 border-primaryFont" />

      <CouponForm className="mb-5" />

      <hr className="border-primaryFont mt-4" />

      <OrderCalculation cartItems={cartItems} />

      <Link
        className="checkout-btn px-5 py-2 mt-3 rounded-lg text-center uppercase bg-primaryFont text-white"
        href={CHECKOUT?.pathname}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
