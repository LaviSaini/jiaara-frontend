import { useDispatch, useSelector } from "react-redux";
import { wishlist } from "@/redux/slices/wishlist"

import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteAllWishListService } from "@/app/api/cms/nodeapi/DetailService";
import { toast } from "react-toastify";
import { useState } from "react";
import Validation from "@/components/general/Validation";


export default function WishlistHead({ className = "", wishlistItemsCount = 0 }) {

  const dispatch = useDispatch();
  const userData = useSelector(data => data.userDataSlice);
  const [isLoading, setIsLoading] = useState(false);
  const clearWishlist = async () => {
    if (userData) {
      setIsLoading(true)
      const response = await deleteAllWishListService(userData?.userId);
      if (response?.response?.success) {
        toast('Wishlist Deleted Successfully!', { type: 'success' })
      } else {
        toast('Something went Wrong!', { type: 'error' })
      }
      setIsLoading(false)
      dispatch(wishlist.clear());

    }
  }
  if (isLoading) {
    return (
      <Validation
        className="w-full h-[10rem] text-primaryFont"
        message="Deleting wishlist..."
      />
    );
  }

  return (
    <div className={`${className} wishlist-head flex justify-between items-center px-5 pt-10 pb-2 xs:px-[5vw] sm:px-[4vw]`}>
      <div className="heading flex gap-3 uppercase font-semibold text-primaryFont md:text-lg">
        <span className="heading-text">
          Your Wishlist
        </span>
        <span className="total-wishlist-items capitalize">
          {wishlistItemsCount <= 1 ? `(${wishlistItemsCount} item)` : `(${wishlistItemsCount} items)`}
        </span>
      </div>
      <div className="actions flex items-center gap-5 text-lg text-primaryFont md:text-xl">
        <button className="icon-cont" onClick={clearWishlist}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
}
