import { useDispatch, useSelector } from "react-redux";
import { cart } from "@/redux/slices/cart";

import { RiDeleteBin6Line } from "react-icons/ri";
import { loaderData } from "@/redux/slices/loader";
import { clearCart } from "@/app/api/cms/nodeapi/DetailService";


export default function CartHead({ className = "", cartItemsCount = 0 }) {

  const dispatch = useDispatch();
  const userData = useSelector(data => data.userDataSlice)

  const clear = async () => {
    dispatch(loaderData.add(true))
    const response = await clearCart(userData?.userId);
    if (response?.response?.success) {
      dispatch(cart.clear());
    }
    dispatch(loaderData.clear())
  }



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
        <button className="icon-cont" onClick={() => clear()}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
}