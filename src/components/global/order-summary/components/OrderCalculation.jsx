'use client';

import { useQuery } from "@tanstack/react-query";

import { getShipping } from "@/utils/functions/api/cms/woocommerce/shipping";

import INR from "@/utils/functions/general/INR";
import useClient from "@/utils/hooks/general/useClient";


export default function OrderCalculation({ className = "", cartItems = [] }) {

  const { data: shipping } = useQuery({
    queryKey: [`shipping-minAmountOnOrder`],
    queryFn: () => getShipping({ zoneId: 1, methodId: 1 }),
  });

  const isClient = useClient();

  const cartItemsSubtotal =
    cartItems.reduce(
      (subtotal, cartItem) => subtotal + (cartItem?.price * cartItem?.quantity), 0
    );

  const shippingCharge = (cartItemsSubtotal > (shipping?.minAmountOnOrder ?? 599) ? 0 : 80);

  const total = cartItemsSubtotal + shippingCharge;


  return (
    (isClient &&
      <div className={`order-calculation flex flex-col gap-2 py-5 text-sm text-primaryFont ${className}`}>
        <div className="subtotal flex justify-between">
          <span className="text">
            Subtotal
          </span>
          <span className="value">
            {INR(cartItemsSubtotal)}
          </span>
        </div>

        <div className="shipping flex justify-between">
          <span className="text">
            Shipping
          </span>
          <span className="value">
            {shippingCharge > 0 ? INR(shippingCharge) : "Free"}
          </span>
        </div>

        <hr className="my-2 border-primaryFont" />

        <div className="total flex justify-between">
          <span className="text text-xl">
            Total
          </span>
          <span className="value text-xl">
            {INR(total)}
          </span>
        </div>
      </div>
    )
  );
}
