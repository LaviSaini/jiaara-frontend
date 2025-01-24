import { IoCartOutline } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";

import Rating from "@/components/general/Rating";
import Icon from "@/components/general/Icon";

import ProductGalleryCarousel from "@/components/global/ProductGalleryCarousel";
import ProductQuantity from "@/components/global/ProductQuantity";

import useClamp from "@/utils/hooks/general/useClamp";
import useTruncateText from "@/utils/hooks/general/useTruncateText";

import useProductUtils from "@/utils/hooks/global/useProductUtils";

import INR from "@/utils/functions/general/INR";

import { WISHLIST } from "@/routes";
import { toast } from "react-toastify";
import { useState } from "react";
import LoginModel from "@/components/model/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { addToCartService, addToWishListService, deleteCartItem, deleteWishListService } from "@/app/api/cms/nodeapi/DetailService";
import { cart } from "@/redux/slices/cart";


const STOCK_LEFT_FALLBACK_VALUE = 15;


export default function SaleProductCard({
  product,
  icon = {
    className: "text-lg",
    active: WISHLIST?.activeIcon,
    inactive: WISHLIST?.inactiveIcon,
    general: <></>
  }
}) {

  const { clamp } = useClamp();

  const { displayText: productName } = useTruncateText({ text: product?.name, wordLimit: 4 });


  const creatNewObj = (data) => {
    const reqObj = {

      "user_id": '',
      "cart_id": '',
      "created_date": '',
      "product_id": data?.id,
      "quantity": 0,
      "img": data?.image,
      "price": data?.price,
      "name": data?.name,
      "status": 's'

    }
    return reqObj
  }
  const {
    cartUtils: { cartItem, addToCart },
    wishlistUtils: { wishlistItem, handleWishlist }
  }
    = useProductUtils(creatNewObj(product));
  console.log(wishlistItem)
  const dispatch = useDispatch()
  const [isModelOpen, setIsModelOpen] = useState(false);
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
  const handleIncrementAndDecrement = (item) => {
    if (item == 1) {
      addItemToCart(1, 'update')
    } else if (item == -1) {
      addItemToCart(-1, 'update')
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
  return (
    <div className="sale-product-card rounded-sm bg-white">
      <div
        className={`
          wrapper
          h-[60vw] flex justify-between
          sm:h-[30vw]
          lg:h-[20vw]
        `}
      >
        <ProductGalleryCarousel
          product={product}
          media={{
            contClassName: `
              w-[44vw] h-[60vw]
              sm:w-[22vw] sm:h-[30vw]
              lg:w-[15vw] lg:h-[20vw]
              relative
            `,
            className: "object-cover object-center rounded-tl-xl"
          }}
          dotsGroupPosition={{
            global: '70%',
            breakpoints: { xs: '75%', sm: ' 70%', xxl: '80%' }
          }}
        />

        <div className="content w-1/2 flex flex-col items-center justify-center gap-3 xs:px-[1.5vw]">
          <div
            className="name text-center font-semibold"
            style={{
              fontSize:
                clamp({
                  xs: { min: 1, current: 5, max: 1.3 },
                  sm: { min: 1, current: 2.1, max: 1.1 },
                  lg: { min: 1, current: 1.35, max: 1.1 }
                })
            }}
          >
            {productName}
          </div>

          <div className="price flex flex-col gap-1">
            <div
              className="discounted-price"
              style={{
                fontSize:
                  clamp({
                    xs: { min: 0.875, current: 4.5, max: 1.1 },
                    sm: { min: 0.875, current: 2.1, max: 1 },
                    lg: { min: 0.875, current: 1.35, max: 1 }
                  })
              }}
            >
              {INR(product?.salePrice)}
            </div>
            <div
              className="actual-price line-through opacity-50"
              style={{
                fontSize:
                  clamp({
                    xs: { min: 0.875, current: 4.5, max: 1.1 },
                    sm: { min: 0.875, current: 2.1, max: 1 },
                    lg: { min: 0.875, current: 1.35, max: 1 }
                  })
              }}
            >
              {INR(product?.regularPrice)}
            </div>
          </div>

          <div className="rating-bar flex items-center gap-3">
            <Rating
              given={product?.rating}
              style={{
                fontSize:
                  clamp({
                    xs: { min: 0.875, current: 4.5, max: 1.1 },
                    sm: { min: 1, current: 2.1, max: 1.5 },
                    lg: { min: 1, current: 1.35, max: 1.5 }
                  })
              }}
            />
            <span
              className="numeric-rating"
              style={{
                fontSize:
                  clamp({
                    xs: { min: 0.73, current: 2.1, max: 1 },
                    sm: { min: 0.73, current: 1.5, max: 1 },
                    lg: { min: 0.73, current: 1, max: 1 }
                  })
              }}
            >
              {product?.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="actions flex justify-around items-center py-5">
        {!cartItem ?
          <button
            className="add-to-cart flex items-center gap-1 px-2 py-2 bg-primaryFont text-white"
            onClick={() => checkIsUserLogin('cart')}
          >
            <IoCartOutline className="text-lg" />
            <span
              className="uppercase"
              style={{
                fontSize:
                  clamp({
                    xs: { min: 0.65, current: 2.5, max: 0.85 },
                    sm: { min: 0.3, current: 1.5, max: 0.85 },
                    lg: { min: 0.3, current: 1, max: 0.8 }
                  })
              }}
            >
              Add to Cart
            </span>
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
        }
        <button
          className="wishlist flex items-center gap-1 px-2 py-2 bg-primaryFont text-white"
          onClick={() => checkIsUserLogin('wishlist')}
        >
          {(icon?.general || icon?.active || icon?.inactive) &&
            <Icon
              className={`${icon?.className}`}
              icon={wishlistItem ? icon?.active : icon?.inactive ?? icon?.general}
            />
          }
          <span
            className="text-xs uppercase"
            style={{
              fontSize: clamp({
                xs: { min: 0.65, current: 2.5, max: 0.85 },
                sm: { min: 0.3, current: 1.5, max: 0.85 },
                lg: { min: 0.3, current: 1, max: 0.8 }
              })
            }}
          >
            {!wishlistItem?.isWishlist ? "Add to Wishlist" : "Added to Wishlist"}
          </span>
        </button>
      </div>
      <LoginModel isOpen={isModelOpen} closeModel={() => { setIsModelOpen(false); }}>
        <form className="search-container size-[20rem]">

          Hello World
        </form>
      </LoginModel>
    </div>
  );
}