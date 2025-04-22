'use client';

import Link from "next/link";

import { useRouter } from 'next/navigation';

import { useState, useRef, useEffect, useCallback, useContext } from "react";
import { context } from "@/context-API/context";

import { FiMinus, FiPlus } from "react-icons/fi";

import ProductUpperOverview from "@/components/pages/product/components/product-display/components/general/ProductUpperOverview";
import Content from "@/components/general/Icon";

import ProductQuantity from "@/components/global/ProductQuantity";

import useSleep from "@/utils/hooks/general/useSleep";
import useTruncateText from "@/utils/hooks/general/useTruncateText";
import usePreviousRoute from "@/utils/hooks/general/usePreviousRoute";

import useProductUtils from "@/utils/hooks/global/useProductUtils";

import INR from "@/utils/functions/general/INR";

import { CHECKOUT } from "@/routes";
import { useDispatch, useSelector } from "react-redux";
import LoginModel from "@/components/model/LoginModel";
import { addToCartService, deleteCartItem } from "@/app/api/cms/nodeapi/DetailService";
import { cart } from "@/redux/slices/cart";
import { loaderData } from "@/redux/slices/loader";
import createObjCommanFunction from "@/utils/functions/general/createCartWishlistObje";
import SlideCart from "@/components/general/SliderCart";
import { buyNow } from "@/redux/slices/buyNow";
import ThankYouModal from "@/components/model/ThankYouModal";

const INITIAL_QTY = 1;
const NO_STOCK_QTY = 0;
const stockLimit = 15;


export default function ProductOverview({ product = null, cartProduct = null }) {

  const { data: { triggered } = {}, data: { states } = {} } = useContext(context) || {};
  const isZoomed = (triggered && states?.zoomableImage?.isZoomed) || false;
  const [isCartOpen, setCartOpen] = useState(false);
  const router = useRouter();

  const { saveRoute: saveCurrentRoute } = usePreviousRoute();

  const {
    isExpanded,
    toggleText,
    displayText: productShortDescription
  }
    = useTruncateText({ text: product?.shortDescription, wordLimit: 17 });


  const { sleep, clearSleep } = useSleep();


  const addToCartButtonRef = useRef(null);
  const [isAddToCartBtnLoading, setIsAddToCartBtnLoading] = useState(false);

  const [quantity, setQuantity] = useState(INITIAL_QTY);

  const [error, setError] = useState({});


  const getQuantity = receivedQuantity => {
    setQuantity(receivedQuantity);
  }

  const userData = useSelector(data => data.userDataSlice)
  const [isModelOpen, setIsModelOpen] = useState(false);

  const {
    cartUtils: { cartItem, addToCart },
    buyNowUtils: { theBuyNow },
  }
    = useProductUtils(cartProduct);
  const cartList = useSelector(state => state?.cartReducer ?? []);
  const dispatch = useDispatch();
  let stockQuantity = product?.stockQuantity ? product?.stockQuantity : stockLimit;
  stockQuantity -= (cartItem?.cartQtyCount ?? 0);


  const getStockStatus = () => {

    if (product?.stock_status == 'instock') {

      if (product?.stockQuantity) {
        return `${product?.stockQuantity} item(s) left in Stock`;
      }
      else {
        return "In Stock";
      }
    }
    else {
      return "Currently, Out of Stock.";
    }
  }

  const disableAddToCartButton = () => {

    addToCartButtonRef.current.disabled = true;
    addToCartButtonRef.current.style.opacity = '0.7';
  }

  const enableAddToCartButton = () => {

    addToCartButtonRef.current.disabled = false;
    addToCartButtonRef.current.style.opacity = '1';
  }

  const manageAddToCartButton = async quantity => {

    setIsAddToCartBtnLoading(true);
    addToCartButtonRef.current.textContent = `${quantity} ${quantity <= 1 ? "Item" : "Items"} Added`;
    disableAddToCartButton();

    await sleep(3000);
    clearSleep();

    const currentStockQuantity = (stockLimit < stockQuantity ? stockLimit : stockQuantity) - quantity;

    if (quantity > currentStockQuantity) {
      setQuantity(currentStockQuantity > 0 ? INITIAL_QTY : NO_STOCK_QTY);
    }

    if (currentStockQuantity > 0) {
      enableAddToCartButton();
    }
    addToCartButtonRef.current.textContent = "Add to Cart";
    setIsAddToCartBtnLoading(false);
  }

  const handleAddToCartButton = async () => {

    addToCart(quantity);
    manageAddToCartButton(quantity);
  }


  const handleBuyNowButton = (event, isValid) => {
    console.log(product)
    let newObj = createObjCommanFunction(product);
    newObj.quantity = 1;
    if (product?.on_sale) {
      newObj.sale = true;
    } else {
      newObj.sale = false
    }
    newObj.regularPrice = product?.regular_price
    console.log(newObj)
    dispatch(buyNow.add([newObj]))
    setCartOpen(true)
  }


  const getError = useCallback(() => {

    if (quantity > stockLimit) {
      return {
        stockLimit: true,
        message: "You have reached the maximum quantity allowed for this product."
      };
    }

    else if (stockQuantity <= 0) {
      return {
        stockQuantity: true,
        message: "No stock left for this product."
      };
    }

    else if (quantity <= 0 || quantity > stockQuantity) {

      const currentQuantityValue
        = stockLimit < stockQuantity ? stockLimit : stockQuantity;

      return {
        quantity: true,
        message: `Quantity should be between 0 and ${currentQuantityValue + 1}`
      };
    }

    return null;

  }, [quantity, stockQuantity]);

  const checkIsUserLogin = () => {
    if (!userData) {
      setIsModelOpen(true)
      return;
    }
    if (cartItem) {
      deletecart('all')
    } else {
      addItemToCart(1, 'new')
    }
  }
  const addItemToCart = async (quantity, type) => {
    const requestObject = {
      userId: userData?.userId,
      productId: product?.id,
      quantity: quantity,
      img: product?.images[0]?.src,
      name: product?.name,
      price: product?.price
    }

    const cartItem = cartList.filter(data => data.product_id == product?.id);
    if (cartItem[0]?.quantity === 1 && quantity == -1) {
      deletecart('one', quantity);
    } else {
      dispatch(loaderData.add(true));
      try {
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

      } catch (error) {
        toast("Something Went Wrong!", { type: "error" })
      }
      dispatch(loaderData.add(false));
    }

  }
  const deletecart = async (type, quantity) => {
    dispatch(loaderData.add(true));
    try {
      const response = await deleteCartItem(userData?.userId, cartItem?.product_id);
      if (response) {
        if (response?.response?.success) {
          if (type == 'one') {
            dispatch(cart.decrementQty({ productId: product?.id, quantity: cartItem?.quantity + quantity }));
          } else {
            dispatch(cart.remove(product?.id))
            // dispatch(cart.decrementQty({ productId: product?.id, quantity: 0 }))
          }
        } else {
          toast('Something Went Wrong!', { type: 'error' })
        }
      } else {
        toast('Something Went Wrong!', { type: 'error' })
      }
    } catch (error) {
      toast('something Went Wrong!', { type: 'error' })
    }
    dispatch(loaderData.add(false));
  }
  const handleIncrementAndDecrement = (item) => {
    if (item == 1) {
      addItemToCart(1, 'update')
    } else if (item == -1) {
      addItemToCart(-1, 'update')
    }

  }
  useEffect(() => {

    const error = getError();
    setError(error);

  }, [getError]);

  const creatNewObj = (data) => {
    return createObjCommanFunction(data);
  }
  const [openThankYouModel, setThankYouModel] = useState(false);
  const closeBuYNowOrder = (e) => {
    console.log(e)
    setCartOpen(false);
    if (e != 'self') {
      setThankYouModel(true);
    }
  }
  return (
    <>
      <div
        id="zoomable-image-preview"
        className={`
          md:px-[3vw]
          ${isZoomed ? "block" : "hidden"}`
        }
      >
      </div>

      <div
        className={`
          product-overview-lower
          flex flex-col gap-4 px-[4vw] pt-5 md:px-[3vw] md:pt-0 md:overflow-y-auto
          xl:items-center
          ${isZoomed ? "hidden" : "block"}
        `}
      >
        <ProductUpperOverview
          className="w-full hidden md:flex md:justify-between md:items-start md:gap-5 xl:w-[95%]"
          product={product}
          cartProduct={creatNewObj(product)}
        />

        <div className="wrapper flex flex-wrap items-center gap-4 xs:justify-around md:flex-col md:items-start xl:w-[95%]">

          <div className="price flex items-center gap-3 text-primaryFont">
            <div className="giving-price text-xl font-semibold sm:text-2xl">
              {INR(product?.salePrice || product?.price)}
            </div>

            {product?.onSale &&
              <>
                <div className="actual-price line-through opacity-50 sm:text-lg">
                  {INR(product?.regularPrice)}
                </div>
                <div className="discount-percentage border-2 px-2 py-1 rounded text-xs uppercase font-semibold border-primaryFont text-primaryFont sm:text-sm">
                  {`Save ${product?.discountPercentage}`}
                </div>
              </>
            }
          </div>

          <div className={`
            stock-status text-sm sm:text-base
            ${product?.stock_status == 'instock' ? "text-green-600" : "text-red-600"}
          `}>
            {getStockStatus()}
          </div>

        </div>

        <div className="product-highlight-wrapper px-[1vw] md:px-0 text-primaryFont xl:w-[95%]">
          <Content
            className="product-highlight-text py-1 text-xs sm:text-sm lg:text-base"
            icon={productShortDescription}
          />
          <button className="text-xs" onClick={toggleText}>
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        </div>

        <div className="actions flex flex-col gap-5 xl:w-[95%]">

          <div className="wrapper  mt-2">
            {
              cartItem ?
                <ProductQuantity
                  productId={product.id}
                  theClassName="flex items-stretch"
                  inputClassName="w-[2.7rem] px-2 py-1 text-center text-sm bg-white sm:text-base sm:py-2"
                  buttonsClassName="px-3 py-2 text-sm bg-white sm:text-base sm:py-2"
                  incrementIcon={FiPlus}
                  decrementIcon={FiMinus}
                  stockLeft={stockQuantity}
                  stockLimit={stockLimit}
                  callback={getQuantity}
                  callDecrement={handleIncrementAndDecrement}
                  callIncrement={handleIncrementAndDecrement}
                  cartQtyCount={cartItem?.quantity}
                />
                :
                ''
            }


            <button
              ref={addToCartButtonRef}
              className={`
                mt-4
                add-to-cart
               w-[100%] lg:w-[70%]
                px-[8vw] py-2 
                text-sm uppercase
               
                2xs:px-[10vw]
                md:px-[3vw]
                lg:px-[5vw]
                rounded-[50px]
                bg-white text-primaryFont border border-primaryFont xs:text-xs hover:bg-primaryFont hover:text-white transition-colors duration-300 ease-in-out font-bold
                ${(product?.stock_status != 'instock') ? "opacity-50" : ""}
              `}
              disabled={product?.stock_status != 'instock'}
              onClick={() => checkIsUserLogin()}
            >
              {cartItem ? 'REMOVE FROM CART' : 'ADD TO CART'}
            </button>
          </div>

          {error &&
            <p className="error text-red-500 text-xs">
              {(!isAddToCartBtnLoading && error?.message) ?? ""}
            </p>
          }

          <button
            className={`
              buy-now
              py-2 
              text-center text-sm uppercase
                
              rounded-[50px]
              w-[100%] lg:w-[70%]
              bg-white text-primaryFont border border-primaryFont xs:text-xs hover:bg-primaryFont hover:text-white transition-colors duration-300 ease-in-out font-bold
              ${error ? "opacity-50 cursor-default" : ""}
            `}

            onClick={event => handleBuyNowButton()}
          >
            Buy Now
          </button>
        </div>
        <LoginModel isOpen={isModelOpen} closeModel={() => { setIsModelOpen(false); }} />
        <SlideCart
          isOpen={isCartOpen}
          onClose={(e) => closeBuYNowOrder(e)}
        // item={product}
        />
        <ThankYouModal isOpen={openThankYouModel} closeModel={() => setThankYouModel(false)} />
      </div>
    </>
  );
}