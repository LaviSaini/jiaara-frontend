'use client';

import { useSelector } from "react-redux";

import UserProductsStatus from "@/components/global/UserProductsStatus";
import CartHead from "@/components/pages/cart/components/CartHead";
import CartData from "@/components/pages/cart/components/CartData";
import OrderSummary from "@/components/pages/cart/components/OrderSummary";
import KeyBenefits from "@/components/global/key-benefits/KeyBenefits";
import RelatedProducts from "@/components/pages/cart/components/RelatedProducts";

import useClient from "@/utils/hooks/general/useClient";
import { useEffect, useState } from "react";
import { gerProductDetailService, getCartListService, getRelatedProductIdsService } from "@/app/api/cms/nodeapi/DetailService";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'


export default function CartManagement() {

  const isClient = useClient();
  const router = useRouter();
  const cartItems = useSelector(state => state?.cartReducer ?? []);
  const userData = useSelector(data => data.userDataSlice)
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    console.log("Called after udpate")
    if (userData) {
      getCartlist();
    } else {
      router.push('/sign-in')
    }
  }, [cartItems])
  const getCartlist = async () => {
    const response = await getCartListService(userData?.userId);
    console.log(response)
    if (response?.response?.success) {
      setCartList(response?.response?.data);
      const productIds = response?.response?.data?.map(element => element?.product_id)
      console.log(productIds)
      // getRelatedProduct(productIds)
    } else {

    }
  }
  const getRelatedProduct = async (productids) => {
    let ids = ''
    productids.forEach((element, index) => {
      ids = ids + 'product_ids[]=' + element;
    })
    console.log(ids)
    const response = await getRelatedProductIdsService(ids);
    console.log(response)
    if (response) {
      const productId = response?.products?.map((element) => element?.id);
      console.log(productId)
      const response2 = await gerProductDetailService();
      console.log('res', response2)
    } else {
      toast('Something Went Wrong!', { type: 'error' })
    }
  }
  return (
    (isClient &&
      <div className="cart-page flex flex-col">
        {/* <UserProductsStatus
          className={`
            px-[8vw] gap-[5vw] my-[10vw]
            text-xs
            text-primaryFont
            2xs:text-sm
            xs:text-base
            sm:my-[8vw]
            sm:text-lg
            md:gap-16
            md:text-xl
            lg:text-2xl
            xl:text-3xl
            2xl:text-4xl
          `}
        /> */}
        <CartHead className="px-[8vw] mt-5" cartItemsCount={cartList?.length} />
        <CartData className="px-[8vw] py-5 mt-5" cartItems={cartList} />
        {cartList?.length > 0 &&
          <OrderSummary className="px-[8vw] mt-5" cartItems={cartList} />
        }
        <KeyBenefits className="mt-10" />
        {cartItems?.length > 0
          &&
          <RelatedProducts className="mt-5 mb-10" cartItems={cartItems} />
        }
      </div>
    )
  );
}