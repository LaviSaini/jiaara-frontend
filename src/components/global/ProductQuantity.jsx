'use client';

import { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { cart } from "@/redux/slices/cart";

import useRouteActive from "@/utils/hooks/general/useRouteActive";

import Icon from "@/components/general/Icon";

import isFalsy from "@/utils/functions/general/isFalsy";

import { PRODUCT } from "@/routes";

const INITIAL_QTY = 1;


export default function ProductQuantity({
  productId = null,
  cartQtyCount = null,
  theClassName = "",
  incrementIcon = "+",
  decrementIcon = "-",
  inputClassName = "",
  buttonsClassName: buttonClassName = "",
  stockLeft = 0,
  stockLimit = undefined,
  callDecrement,
  callIncrement,
  callback = () => { }
}) {

  const qtyInputRef = useRef(null);

  const { isActive: isProductPage } = useRouteActive({ href: PRODUCT.getPathname(productId) });

  const dispatch = useDispatch();


  const [quantity, setQuantity] = useState(cartQtyCount || INITIAL_QTY);

  useEffect(() => {

    setQuantity(isProductPage ? cartQtyCount : cartQtyCount || INITIAL_QTY);

  }, [isProductPage, cartQtyCount]);


  useEffect(() => {

    qtyInputRef.current.readOnly = !isProductPage ? true : false;
  }, [isProductPage]);


  const isOutOfStock = () => {
    return (
      (stockLimit && stockLimit <= 0) || (stockLimit && stockLeft <= 0)
    );
  }


  const disableDecrementButton = () => {
    return (
      quantity <= (isProductPage ? 1 : 0) || isOutOfStock()
    );
  }

  const disableIncrementButton = () => {
    return (
      quantity >= (stockLeft || stockLimit) || isOutOfStock()
    );
  }


  const handleQtyInput = event => {

    let inputValue = event.target.value.replace(/[^0-9]/g, '');

    if (isFalsy({ value: inputValue, exclude: [0] })) {
      callback('');
      setQuantity('');
    }

    else if (!isNaN(inputValue)) {
      inputValue = parseInt(inputValue, 10);
      callback(inputValue);
      setQuantity(inputValue);
    }
  }


  const handleIncrement = () => {

    // if (!isProductPage) {
    //   dispatch(cart.incrementQty({ productId, cartQtyCount: quantity + 1 }));
    // }
    // callback(quantity + 1);

    // setQuantity(prev => {

    //   if (isFalsy({ value: prev })) {
    //     return INITIAL_QTY;
    //   }
    //   return prev + 1;
    // });

    callIncrement(1);
  }

  const handleDecrement = () => {
    callDecrement(-1);
    // if (!isProductPage) {
    //   dispatch(cart.decrementQty({ productId, cartQtyCount: quantity - 1 }));
    // }
    // callback(quantity - 1);
    // setQuantity(prev => prev - 1);
  }


  return (
    <div className={`quantity ${theClassName}`}>
      <button
        className={`
          increment-btn
          flex justify-center items-center
          rounded-s-sm
          font-semibold
          ${buttonClassName}
           
        `}
        type="button"
        onClick={handleIncrement}

      >
        <Icon className="plus-icon" icon={incrementIcon} />
      </button>
      <input
        ref={qtyInputRef}
        className={`bg-white 
          quantity-count
          input-selection-black
          ${!isProductPage ? "cursor-default" : ""}
          ${inputClassName}
          ${isOutOfStock() ? "opacity-50" : ""}
        `}
        autoComplete="off"
        value={quantity}
        onChange={handleQtyInput}
        disabled={true}
      />
      <button
        className={`
          decrement-btn
          flex justify-center items-center
          rounded-e-sm
          font-semibold
          ${buttonClassName}
           }
        `}
        type="button"
        onClick={handleDecrement}

      >
        <Icon className="minus-icon" icon={decrementIcon} />
      </button>
    </div>
  );
}