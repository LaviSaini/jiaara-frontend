'use client';

import { useSelector } from "react-redux";

import WishlistHead from "@/components/pages/wishlist/components/WishlistHead";
import ProductGrid from "@/components/global/ProductGrid";
import Validation from "@/components/general/Validation";
import { useEffect, useState } from "react";
import { getWishListService } from "@/app/api/cms/nodeapi/DetailService";


export default function WishlistManagement({ className = "" }) {

  const [wishlistItems, setWishlistItems] = useState([])
  // const wishlistItems = useSelector(state => state?.wishlistReducer ?? []);
  const userData = useSelector(data => data.userDataSlice)
  const wishlist = useSelector(state => state?.wishlistReducer ?? []);
  useEffect(() => {
    if (userData) {
      getWishList()
    }
  }, [wishlist])
  const getWishList = async () => {
    const response = await getWishListService(userData?.userId);
    if (response?.response?.success) {
      if (response?.response?.data?.length > 0) {
        const newArray = response?.response?.data?.map((element) => {
          return JSON.parse(element?.data)
        })
        setWishlistItems(newArray)
      } else {
        setWishlistItems([])
      }
    }
  }
  return (
    <div className={`wishlist-management ${className}`}>
      <WishlistHead
        wishlistItemsCount={wishlistItems?.length}
      />
      {wishlistItems?.length <= 0 ? (
        <Validation
          className="w-full h-[10rem] text-primaryFont"
          message="Wishlist is empty."
        />
      )
        :
        (
          <ProductGrid
            className="wishlist-product-grid"
            products={wishlistItems}
          />
        )}
    </div>
  );
}
