'use client';

import { memo, useEffect, useState } from "react";

import Product from "@/components/global/Product";
import { useDispatch, useSelector } from "react-redux";
import { getCartListService, getWishListService } from "@/app/api/cms/nodeapi/DetailService";
import { cart } from "@/redux/slices/cart";
import { wishlist } from "@/redux/slices/wishlist";
import { loaderData } from "@/redux/slices/loader";
import createObjCommanFunction from "@/utils/functions/general/createCartWishlistObje";


const ProductGrid = ({
  className = "",
  products = null,
  otherClasses = ""
}) => {
  const [productList, setProductList] = useState([]);
  const userData = useSelector(data => data.userDataSlice);
  useEffect(() => {
    setProductList(products)
    dispatch(loaderData.clear())
    if (userData) {

      fetchCartList()
      fetchWishList()
    }
  }, [])
  const dispatch = useDispatch()
  const fetchCartList = async () => {

    const response = await getCartListService(userData?.userId);
    if (response?.response?.success) {
      if (response?.response?.data?.length > 0) {
        dispatch(cart.addAll(response?.response?.data))
      } else {
        dispatch(cart.addAll([]))
      }

    }
  }
  const fetchWishList = async () => {
    const response = await getWishListService(userData?.userId);
    if (response?.response?.success) {
      if (response?.response?.data?.length > 0) {
        const newArray = response?.response?.data?.map((element) => {
          return creatNewObj(JSON.parse(element?.data))
        })
        dispatch(wishlist.addAll(newArray))
      } else {
        dispatch(wishlist.addAll([]))
      }
    }
  }
  const creatNewObj = (data) => {
    return createObjCommanFunction(data)
  }
  return (
    <div
      className={`
        product-grid
         ${otherClasses} justify-between items-center gap-x-[5vw] gap-y-10 px-5 py-5
        xs:px-[5vw]
        sm:justify-start sm:px-[4vw]
        ${className}
      `}
    >
      {productList.map((product, index) =>
        <Product
          key={index}
          className={`
            w-[87vw]
            2xs:w-[42vw]
            sm:w-[27vw]
            lg:w-[18vw]
            2xl:w-[18vw]
          `}
          imgContClassName={`
            w-full relative
            h-[87vw]
            2xs:h-[42vw]
            sm:h-[27vw]
            lg:h-[18vw]
            2xl:h-[18vw]
          `}
          productDetailsContClassName="text-xs text-primaryFont"
          productNameClassName="uppercase"
          btnTextClassName="text-2xs uppercase bg-white text-primaryFont border border-primaryFont xs:text-xs hover:bg-primaryFont hover:text-white transition-colors duration-300 ease-in-out font-bold"
          iconContClassName="text-lg p-2 bg-white  text-black "
          product={product}
          cartProduct={creatNewObj(product)}
        />
      )}
    </div>
  );
}


export default ProductGrid;