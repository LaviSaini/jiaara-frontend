import { GoHome, GoHomeFill } from "react-icons/go";
import { IoPricetagsOutline, IoPricetagsSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { RiUserLine, RiUserFill } from "react-icons/ri";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoCart, IoCartOutline } from "react-icons/io5";


export const HOME = {
  id: "home",
  title: "Home",
  pathname: "/",
  inactiveIcon: GoHome,
  activeIcon: GoHomeFill
}

export const SHOP = {
  id: "shop",
  title: "Shop",
  pathname: "/shop",
  inactiveIcon: IoPricetagsOutline,
  activeIcon: IoPricetagsSharp
}

export const PRODUCT = {
  id: "product",
  title: "Product",
  getPathname: (value = "") => `/product/${value}`
}

export const CATEGORIES = {
  id: "categories",
  title: "Category",
  getPathname: (value = "") => `/category/${value}`
}

export const COLLECTIONS = {
  id: "collections",
  title: "Collections",
  getPathname: (value = "") => `/collection/${value}`
}

export const SIGN_IN = {
  id: "sign-in",
  title: "Sign In",
  pathname: "/sign-in",
  inactiveIcon: RiUserLine,
  activeIcon: RiUserFill
}

export const SEARCH = {
  id: "search",
  title: "Search",
  generalIcon: CiSearch
}

export const WISHLIST = {
  id: "wishlist",
  title: "Wishlist",
  pathname: "/wishlist",
  inactiveIcon: IoMdHeartEmpty,
  activeIcon: IoMdHeart,
  isBadgeEnabled: true
}

export const CART = {
  id: "cart",
  title: "Cart",
  pathname: "/cart",
  inactiveIcon: IoCartOutline,
  activeIcon: IoCart,
  isBadgeEnabled: true
}

export const CHECKOUT = {
  id: "checkout",
  title: "Checkout",
  pathname: "/checkout"
}

export const ORDER = {
  id: "order",
  title: "Order",
  getPathname: (value = "") => `/order/${value}`
}

export const CONTACT_US = {
  id: "contact-us",
  title: "Contact Us",
  pathname: "/contact-us"
}

export const PRIVACY_POLICY = {
  id: "privacy-policy",
  title: "Privacy Policy",
  pathname: "/privacy-policy"
}

export const SHIPPING_POLICY = {
  id: "shipping-policy",
  title: "Shipping Policy",
  pathname: "/shipping-policy"
}

export const TERMS_AND_CONDITIONS = {
  id: "terms-and-conditions",
  title: "Terms and Conditions",
  pathname: "/terms-and-conditions"
}

export const RETURN_REFUND_CANCELLATION_POLICY = {
  id: "return-refund-cancellation-policy",
  title: "Return, Refund & Cancellation Policy",
  pathname: "/return-refund-cancellation-policy"
}


export function getAllRoutes() {

  return ({
    HOME,
    SHOP,
    PRODUCT,
    CATEGORIES,
    COLLECTIONS,
    SEARCH,
    SIGN_IN,
    WISHLIST,
    CART,
    CHECKOUT,
    CONTACT_US,
    PRIVACY_POLICY,
    SHIPPING_POLICY,
    TERMS_AND_CONDITIONS,
    RETURN_REFUND_CANCELLATION_POLICY
  });
}