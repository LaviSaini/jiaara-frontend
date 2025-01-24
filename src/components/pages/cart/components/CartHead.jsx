import { useDispatch } from "react-redux";
import { cart } from "@/redux/slices/cart";

import { RiDeleteBin6Line } from "react-icons/ri";


export default function CartHead({ className = "", cartItemsCount = 0 }) {

  const dispatch = useDispatch();
  const clearCart = () =>
    dispatch(cart.clear());


  return (
    <div className={`cart-head flex justify-between items-center ${className}`}>
      <div className="heading flex gap-3 uppercase font-semibold text-primaryFont md:text-lg">
        <span className="heading-text">
          Your Cart
        </span>
        <span className="total-cart-items capitalize">
          {cartItemsCount <= 1 ? `(${cartItemsCount} item)` : `(${cartItemsCount} items)`}
        </span>
      </div>
      <div className="actions flex items-center gap-5 text-lg text-primaryFont md:text-xl">
        <button className="icon-cont" onClick={clearCart}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
}