import Rating from "@/components/general/Rating";
import Icon from "@/components/general/Icon";

import useProductUtils from "@/utils/hooks/global/useProductUtils";

import { WISHLIST } from "@/routes";
import { useDispatch, useSelector } from "react-redux";
import { loaderData } from "@/redux/slices/loader";
import { addToWishListService, deleteWishListService } from "@/app/api/cms/nodeapi/DetailService";
import LoginModel from "@/components/model/LoginModel";
import { useState } from "react";


export default function ProductUpperOverview({
  className = "",
  product = null,
  cartProduct = null,

  icon = {
    className: "text-2xl text-primaryFont",
    active: WISHLIST?.activeIcon,
    inactive: WISHLIST?.inactiveIcon,
    general: <></>
  }
}) {
  const dispatch = useDispatch();
  const {
    cartUtils: { cartItem, addToCart },
    wishlistUtils: { wishlistItem, handleWishlist }
  }
    = useProductUtils(cartProduct);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const userData = useSelector(data => data.userDataSlice)
  const wishlistaction = () => {
    if (!userData) {

      setIsModelOpen(true)
      return;
    }
    if (wishlistItem) {

      deleteWishList(product?.id)
    } else {
      addItemToWishList();
    }
  }
  const deleteWishList = async (productId) => {
    dispatch(loaderData.add(true));
    const response = await deleteWishListService(userData?.userId, productId);
    if (response?.response?.success) {
      handleWishlist()
    }
    dispatch(loaderData.add(false));
  }
  const addItemToWishList = async () => {
    const requestObject = {
      userId: userData?.userId,
      productId: product?.id,
      data: JSON.stringify(product)
    }
    dispatch(loaderData.add(true));
    const response = await addToWishListService(requestObject);
    if (response?.response?.success) {
      handleWishlist()
    } else {
      toast('Something Went Wrong!', { type: 'error' })
    }
    dispatch(loaderData.add(false));

  }
  return (
    <div className={`wrapper flex justify-between items-left ${className}`}>
      <div className="product-overview-upper">
        <h2 className="product-name text-lg font-medium text-primaryFont uppercase">
          {product?.name}
        </h2>

        <div className="wrapper flex items-center gap-3 py-1 text-primaryFont">
          <Rating className="product-rating text-lg" given={product?.rating ?? 0} />
          <div className="ratings-count text-xs uppercase opacity-50">
            {`${product?.ratingCount ?? 0} Ratings`}
          </div>
        </div>
      </div>

      {icon &&
        <button
          className={`wishlist-icon-btn`}
          onClick={wishlistaction}
        >
          {(icon?.general || icon?.active || icon?.inactive) &&
            <Icon
              className={`${icon?.className}`}
              icon={wishlistItem ? icon?.active : icon?.inactive}
            />
          }
        </button>
      }
      <LoginModel isOpen={isModelOpen} closeModel={() => { setIsModelOpen(false); }} />

    </div>
  );
}