'use client';

import { FiPlus, FiMinus } from "react-icons/fi";

import Icon from "@/components/general/Icon";
import ProductQuantity from "@/components/global/ProductQuantity";
import ProductGalleryCarousel from "@/components/global/ProductGalleryCarousel";

import useWindowSize from "@/utils/hooks/general/useWindowSize";
import useTruncateText from "@/utils/hooks/general/useTruncateText";
import useRouteActive from "@/utils/hooks/general/useRouteActive";

import useProductUtils from '@/utils/hooks/global/useProductUtils';

import INR from "@/utils/functions/general/INR";

import { STOCK_LEFT_FALLBACK_VALUE } from "@/utils/constants";

import { SHOP, CATEGORIES, COLLECTIONS, WISHLIST } from "@/routes";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "../general/Modal";
import { useState } from "react";
import useClickOutside from "@/utils/hooks/general/useClickOutside";
import LoginModel from "../model/LoginModel";
import { addToCartService, addToWishListService, deleteCartItem, deleteWishListService } from "@/app/api/cms/nodeapi/DetailService";
import { cart } from "@/redux/slices/cart";
import { wishlist } from "@/redux/slices/wishlist";


export default function Product({
  className = "",
  product = null,
  cartProduct = null,
  imgContClassName = "",
  imgClassName = "",
  productDetailsContClassName = "",
  productNameClassName = "",
  productPriceClassName = "",
  btnClassName = "",
  btnTextClassName = "",
  btnText = "Add to Cart",
  iconContClassName = "",
  icon = {
    className: "text-primaryFont",
    active: WISHLIST?.activeIcon,
    inactive: WISHLIST?.inactiveIcon,
    general: <></>
  }
}) {

  const [isModelOpen, setIsModelOpen] = useState(false);

  const { activeRoute, isRouteActive } = useRouteActive();

  const { screenWidth, breakpoints: { xxs, xs, sm, md, lg, xl, xxl } } = useWindowSize();

  const getWordLimit = () => {

    if (screenWidth < xxs) {
      if (
        isRouteActive(SHOP?.pathname) ||
        activeRoute.includes(CATEGORIES.getPathname()) ||
        activeRoute.includes(COLLECTIONS.getPathname())
      ) {
        return 9;
      }
      return 3;
    }
    else if (screenWidth >= xxs && screenWidth < xs) {
      return 3;
    }
    else if (screenWidth >= xs && screenWidth < sm) {
      return 4;
    }
    else if (screenWidth >= sm && screenWidth < md) {
      return 2;
    }
    else if (screenWidth >= md && screenWidth < lg) {
      return 2;
    }
    else if (screenWidth >= lg && screenWidth < xl) {
      return 3;
    }
    else if (screenWidth >= xl && screenWidth < xxl) {
      return 4;
    }
    else if (screenWidth >= xxl) {
      return 4;
    }
  }

  const { displayText: truncatedProductName }
    = useTruncateText({ text: product?.name, wordLimit: getWordLimit() });
  const dispatch = useDispatch();
  const {
    cartUtils: { cartItem, addToCart },
    wishlistUtils: { wishlistItem, handleWishlist }
  }
    = useProductUtils(cartProduct);
  const userData = useSelector(data => data.userDataSlice)
  const cartList = useSelector(state => state?.cartReducer ?? []);

  const checkIsUserLogin = (type) => {
    if (!userData) {
      toast('login required', { type: 'error' })
      setIsModelOpen(true)
      return;
    }
    if (type == 'cart') {
      addItemToCart(1, 'new')
    } else if (type == 'wishlist') {
      if (wishlistItem) {
        deleteWishList(wishlistItem?.product_id)
      } else {
        addItemToWishList()

      }
    }
  }
  const deleteWishList = async (productId) => {
    const response = await deleteWishListService(userData?.userId, productId);
    if (response?.response?.success) {
      handleWishlist()
    }
  }
  const addItemToWishList = async () => {
    const requestObject = {
      userId: userData?.userId,
      productId: product?.id,
      data: JSON.stringify(product)
    }
    const response = await addToWishListService(requestObject);
    if (response?.response?.success) {
      handleWishlist()
    } else {
      toast('Something Went Wrong!', { type: 'error' })
    }
  }
  const addItemToCart = async (quantity, type) => {
    const requestObject = {
      userId: userData?.userId,
      productId: product?.id,
      quantity: quantity,
      img: product?.image,
      name: product?.name,
      price: product?.price
    }
    const cartItem = cartList.filter(data => data.product_id == product?.id);
    if (cartItem[0]?.quantity === 1 && quantity == -1) {
      const response = await deleteCartItem(userData?.userId, cartItem[0]?.product_id);
      if (response) {
        if (response?.response?.success) {
          dispatch(cart.decrementQty({ productId: product?.id, quantity: cartItem[0]?.quantity + quantity }));
        } else {
          toast('Something Went Wrong!', { type: 'error' })
        }
      } else {
        toast('Something Went Wrong!', { type: 'error' })
      }
    } else {
      const response = await addToCartService(requestObject);
      if (response?.response?.success) {
        if (type == 'new') {
          addToCart()
        } else if (type == 'update') {
          if (quantity == 1) {
            dispatch(cart.incrementQty({ productId: product?.id, quantity: cartItem[0]?.quantity + quantity }));
          } else {
            dispatch(cart.decrementQty({ productId: product?.id, quantity: cartItem[0]?.quantity + quantity }));
          }
        }
      } else {
        toast('Something Went Wrong!', { type: 'error' })
      }
    }

  }
  // useClickOutside(modalRef, () => {
  //   setIsModelOpen(false);
  // });
  const handleIncrementAndDecrement = (item) => {
    if (item == 1) {
      addItemToCart(1, 'update')
    } else if (item == -1) {
      addItemToCart(-1, 'update')
    }

  }
  return (
    <div className={`product-cont flex flex-col items-center justify-center gap-3 z-10 ${className}`}>
      <ProductGalleryCarousel
        product={product}
        media={{
          contClassName: imgContClassName,
          className: imgClassName
        }}
        dotsGroupPosition={{
          global: '60%',
          breakpoints: { xs: '65%', sm: '75%', lg: '70%', xxl: '80%' }
        }}
      />

      {(product?.name || product?.price) &&
        <div className={`
          product-details
          flex flex-col items-center justify-center gap-1
          text-center
          ${productDetailsContClassName}
        `}>
          {product?.name &&
            <div className={`name ${productNameClassName} h-[2rem]`}>
              {truncatedProductName}
            </div>
          }
          {product?.price &&
            <div className={`price ${productPriceClassName}`}>
              {INR(product.price)}
            </div>
          }
        </div>
      }

      {(btnText || icon) &&
        <div className={`btn-group w-[97%] flex justify-center items-center ${btnClassName}`}>
          {btnText &&
            (!cartItem ?
              <button
                className={`add-to-cart-btn w-full py-2 ${btnTextClassName}`}
                onClick={() => checkIsUserLogin('cart')}
              >
                {btnText}
              </button>
              :
              <ProductQuantity
                productId={cartItem?.product_id}
                theClassName="h-[2rem] flex items-stretch ms-1 rounded-sm bg-primaryFont xs:ms-0"
                inputClassName="w-[1.5rem] px-2 py-1 outline-none text-center text-xs input-selection-primaryFont focus:ring-1 hover:ring-1 focus:ring-primaryFont hover:ring-secondaryBackground xs:w-[3rem] xs:text-base sm:px-3 sm:py-2"
                buttonsClassName="px-2 py-2 text-xs text-white xs:text-sm sm:px-3 sm:py-2 sm:text-base"
                incrementIcon={FiPlus}
                decrementIcon={FiMinus}
                cartQtyCount={cartItem?.quantity}
                callDecrement={handleIncrementAndDecrement}
                callIncrement={handleIncrementAndDecrement}
                stockLeft={
                  product?.stockQuantity ? product?.stockQuantity : STOCK_LEFT_FALLBACK_VALUE
                }
              />
            )
          }
          {icon &&
            <button
              className={`wishlist-icon-btn ${iconContClassName}`}
              onClick={() => checkIsUserLogin('wishlist')}
            >
              {(icon?.general || icon?.active || icon?.inactive) &&
                <Icon
                  className={`${icon?.className}`}
                  icon={wishlistItem ? icon?.active : icon?.inactive}
                />
              }
              {
              }
            </button>
          }
        </div>
      }
      <LoginModel isOpen={isModelOpen} closeModel={() => { setIsModelOpen(false); }} />


    </div>
  );
}
