'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState, useContext, useEffect } from 'react';
import { context } from "@/context-API/context";

import { useDispatch, useSelector } from 'react-redux';

import { useQuery } from "@tanstack/react-query";

import ManageSearch from "@/components/pages/layout/header/components/ManageSearch";

import NavItem from '@/components/general/NavItem';
import NavItemDropdown from '@/components/general/AutoSelect';
import HamburgerMenu from '@/components/general/HamburgerMenu';

import { MdOutlineArrowDropDown } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import useWindowSize from '@/utils/hooks/general/useWindowSize';
import useRouteActive from '@/utils/hooks/general/useRouteActive';

import { getCategories } from "@/utils/functions/api/cms/woocommerce/categories";
import { getCollections } from "@/utils/functions/api/cms/woocommerce/collections";

import skipMap from "@/utils/functions/general/skipMap";

import { getAllRoutes } from '@/routes';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { buyNow } from '@/redux/slices/buyNow';
import { wishlist } from '@/redux/slices/wishlist';
import { cart } from '@/redux/slices/cart';
import { userdata } from '@/redux/slices/userdata';
import { coupon } from '@/redux/slices/coupon';
import { getCartListService, getWishListService } from '@/app/api/cms/nodeapi/DetailService';
import { loaderData } from '@/redux/slices/loader';
import { categoryData } from '@/redux/slices/category';

const { HOME, SHOP, CATEGORIES, COLLECTIONS, CART, WISHLIST, SEARCH } = getAllRoutes();

const brandLogo = {
  white: "/assets/logos/jiaara-white.png",
  black: "/assets/logos/jiaara-black.png"
};


export default function Header() {
  const dispatch = useDispatch();
  const { screenWidth, breakpoints: { md, lg } } = useWindowSize();


  const { isActive: isHomepage } = useRouteActive({ href: HOME?.pathname });

  const { data: { triggered } = {}, data: { states } = {} } = useContext(context) || {};

  const isHeroSecVisible = isHomepage && (triggered && states?.isHeroSecVisible);


  const [isOpen, setIsOpen]
    = triggered && Array.isArray(states?.layoutSidebar) ? states?.layoutSidebar : [false, () => { }];

  const toggleSidebar = () => setIsOpen(!isOpen);


  const disableNavItem = (currentRoute, routes, breakpoint = md) => {

    if (!currentRoute || !currentRoute.id || !Array.isArray(routes)) return false;
    return !(routes.some(route => route.id === currentRoute.id) && screenWidth >= breakpoint);
  };

  const enableNavItem = (currentRoute, routes, breakpoint = md) => {

    if (!currentRoute || !currentRoute.id || !Array.isArray(routes)) return true;
    return !(routes.some(route => route.id === currentRoute.id) && screenWidth < breakpoint);
  };
  const userData = useSelector(data => data.userDataSlice)


  const requiredCategories = categories => {
    return skipMap(categories, [{ name: "General" }], category =>
    ({
      id: category?.id,
      name: category?.name,
      slug: category?.slug,
      count: category?.count,
      url: CATEGORIES?.getPathname(category?.id)
    })
    );
  }

  const requiredCollections = collections => {

    return collections.map(collection =>
    ({
      id: collection?.id,
      name: collection?.name,
      slug: collection?.slug,
      count: collection?.count,
      url: COLLECTIONS?.getPathname(collection?.id)
    })
    );
  }

  const [parentCategories, setParentCategories] = useState(null);
  const [isParentCategoriesLoading, setIsParentCategoriesLoading] = useState(true);
  const [isParentCategoriesSuccess, setIsParentCategoriesSuccess] = useState(false);

  useEffect(() => {
    dispatch(loaderData.clear())
    const fetchParentCategories = async () => {
      setIsParentCategoriesLoading(true);
      try {
        const response = await Axios.get("https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories");
        dispatch(categoryData.addAll(response.data))
        setParentCategories(response.data);
        setIsParentCategoriesSuccess(true);
      } catch (error) {
        console.error("Error fetching parent categories:", error);
        setIsParentCategoriesSuccess(false);
      } finally {
        setIsParentCategoriesLoading(false);
      }
    };

    fetchParentCategories();
  }, []);


  // const {
  //   data: parentCategories,
  //   isLoading: isParentCategoriesLoading,
  //   isSuccess: isParentCategoriesSuccess
  // } =
  //   useQuery({
  //     queryKey: ['parent-categories'],
  //     queryFn: () => getCategories({ parent: 0 }),
  //     retry: 10,
  //     retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  //   });

  useEffect(() => {
    if (userData) {
      fetchCartList(userData?.userId);
      fetchWishList(userData?.userId);
    }
  }, [userData])
  const fetchCartList = async (userId) => {

    const response = await getCartListService(userId);
    if (response?.response?.success) {
      if (response?.response?.data?.length > 0) {
        dispatch(cart.addAll(response?.response?.data))
      } else {
        dispatch(cart.addAll([]))
      }

    }
  }
  const fetchWishList = async (userId) => {

    const response = await getWishListService(userId);
    if (response?.response?.success) {
      if (response?.response?.data?.length > 0) {
        dispatch(wishlist.addAll(response?.response?.data))
      }
    }
  }
  const [collections, setCollections] = useState(null);
  const [isCollectionsLoading, setIsCollectionsLoading] = useState(true);
  const [isCollectionsSuccess, setIsCollectionsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollections = async (attempt = 0) => {
    setIsCollectionsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories?page=1&per_page=100&parent=15"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setCollections(result);
      setIsCollectionsSuccess(true);
    } catch (err) {
      if (attempt < 10) {
        // Retry with exponential backoff (max 30 sec delay)
        setTimeout(() => fetchCollections(attempt + 1), Math.min(1000 * 2 ** attempt, 30000));
      } else {
        setError(err.message);
        setIsCollectionsSuccess(false);
      }
    } finally {
      setIsCollectionsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const totalCartItems = useSelector(
    state => state?.cartReducer?.reduce((sum, item) => sum + item?.quantity, 0) ?? 0
  );
  const totalWishlistItems = useSelector(state => state?.wishlistReducer?.length ?? 0);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const logout = () => {

    dispatch(buyNow.clear())
    dispatch(wishlist.clear())
    dispatch(cart.clear())
    dispatch(userdata.clear())
    dispatch(coupon.clear())

  }
  return (
    <header
      id="header"
      className={`
        w-full flex items-center fixed px-3 py-1 z-20
        ${isHeroSecVisible ? "bg-secondaryBackground" : "bg-secondaryBackground"}
        md:px-5 lg:px-10
      `}
    >

      <Link className="app-brand img-cont-wrapper" href={HOME?.pathname}>
        <div className="img-cont size-[100px] relative">
          <Image
            fill
            src={isHeroSecVisible ? brandLogo?.black : brandLogo?.black}
            alt="brand-logo"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </Link>

      <div className="wrapper w-full flex relative font-medium">

        <nav className="navbar w-[inherit] fixed bottom-0 left-0 lg:static">
          <ul className={`
            nav-items-cont
            flex justify-around items-center px-3
            bg-secondaryBackground
            lg:justify-evenly lg:px-0 lg:py-5 lg:uppercase lg:bg-transparent
          `}>
            {[HOME, SHOP].map(route =>
              <NavItem
                key={route?.id}
                title={{
                  className: `
                    nav-item-title
                    text-sm
                    text-primaryFont
                    ${isHeroSecVisible ? "lg:text-primaryFont" : "lg:text-primaryFont"}
                  `,
                  name: route?.title
                }}
                href={{
                  className: `
                    flex flex-col items-center justify-center gap-2 px-3 py-3 rounded
                    lg:flex-row lg:gap-2
                  `,
                  pathname: route?.pathname
                }}
                icon={{
                  className: `
                    nav-item-icon
                    text-base
                    text-primaryFont
                    lg:hidden
                    ${isHeroSecVisible ? "lg:text-primaryFont" : "lg:text-primaryFont"}
                  `,
                  status: {
                    active: route?.activeIcon,
                    inactive: route?.inactiveIcon,
                    general: route?.generalIcon
                  }
                }}
                enabled={disableNavItem(route, [], lg)}
              />
            )}

            {screenWidth >= lg &&
              <li className="categories-nav-item nav-item list-none">
                <NavItemDropdown
                  className="categories-dropdown text-sm"
                  inputGroupClassName="cursor-default"
                  isLinkMode={true}
                  input={{
                    id: "categories-dropdown",
                    inputName: "categoriesDropdown",
                    className: `
                      w-[8rem] pt-1 pb-2 uppercase bg-transparent
                      hover:ring-transparent focus:ring-transparent cursor-default 
                      ${isHeroSecVisible ? "text-primaryFont" : "text-primaryFont"}
                    `,
                    defaultValue: CATEGORIES?.title,
                    icon: {
                      className: `
                        mb-1 text-lg
                        ${isHeroSecVisible ? "text-primaryFont" : "text-primaryFont"}
                        ${isParentCategoriesLoading ? "text-xs animate-spin" : ""}
                      `,
                      theIcon:
                        isParentCategoriesLoading ?
                          <AiOutlineLoading3Quarters /> : <MdOutlineArrowDropDown />
                    },
                    autoComplete: "off",
                    readOnly: true
                  }}
                  dropdownClassName={`
                    w-[13rem] rounded-sm
                    ${isHeroSecVisible ?
                      "bg-secondaryBackground text-primaryFont" :
                      "bg-secondaryBackground text-primaryFont"
                    }   
                  `}
                  options={isParentCategoriesSuccess ? requiredCategories(parentCategories) : []}
                  optionClassName={{
                    hover: `
                      ${isHeroSecVisible ?
                        "hover:bg-primaryFont hover:text-white" :
                        "hover:bg-primaryFont hover:text-white"
                      }
                    `,
                    link: "flex justify-between items-center"
                  }}
                />
              </li>
            }

            {screenWidth >= lg &&
              <li className="collections-nav-item nav-item list-none">
                <NavItemDropdown
                  className="collections-dropdown text-sm"
                  isLinkMode={true}
                  input={{
                    id: "collections-dropdown",
                    inputName: "collectionsDropdown",
                    className: `
                      w-[9rem] pt-1 pb-2 uppercase bg-transparent
                      hover:ring-transparent focus:ring-transparent cursor-default 
                      ${isHeroSecVisible ? "text-primaryFont" : "text-primaryFont"}
                    `,
                    defaultValue: COLLECTIONS?.title,
                    icon: {
                      className: `
                        mb-1 text-lg
                        ${isHeroSecVisible ? "text-primaryFont" : "text-primaryFont"}
                        ${isCollectionsLoading ? "text-xs animate-spin" : ""}
                      `,
                      theIcon:
                        isCollectionsLoading ?
                          <AiOutlineLoading3Quarters /> : <MdOutlineArrowDropDown />
                    },
                    autoComplete: "off",
                    readOnly: true
                  }}
                  dropdownClassName={`
                    w-[13rem] rounded-sm
                    ${isHeroSecVisible ?
                      "bg-secondaryBackground text-primaryFont" :
                      "bg-secondaryBackground text-primaryFont"
                    }   
                  `}
                  options={isCollectionsSuccess ? requiredCollections(collections) : []}
                  optionClassName={{
                    hover: `
                      ${isHeroSecVisible ?
                        "hover:bg-primaryFont hover:text-white" :
                        "hover:bg-primaryFont hover:text-white"
                      }
                    `,
                    link: "flex flex-wrap justify-between items-center"
                  }}
                />
              </li>
            }
          </ul>
        </nav>

        <nav className="nav-icons-cont grow flex flex-col items-end justify-center py-8 lg:items-baseline">
          <ul className={`
            flex justify-center items-center gap-4 px-3
            text-lg
            ${isHeroSecVisible ? "text-primaryFont" : "text-primaryFont"}
          `}>
            {
              userData ?

                [WISHLIST, CART].map(route =>
                  <NavItem
                    key={route?.id}
                    href={{
                      pathname: route?.pathname
                    }}
                    icon={{
                      status: {
                        active: route?.activeIcon,
                        inactive: route?.inactiveIcon,
                        general: route?.generalIcon
                      },
                      badge: {
                        badge: {
                          size: "15px",
                          textSize: "text-2xs",
                          position: {
                            top: "-8px",
                            left: "13px"
                          },
                          value: route?.id === "wishlist" ? totalWishlistItems : totalCartItems,
                          backgroundColor: `
                        ${isHeroSecVisible ? "bg-primaryFont" : "bg-primaryFont"}
                      `,
                          textColor: "text-white"
                        },
                        isBadgeEnabled: route?.isBadgeEnabled
                      }
                    }}
                    enabled={enableNavItem(route, [], lg)}
                  />
                )

                :
                ''
            }

            {
              userData ?
                <div style={{ cursor: 'pointer' }} onClick={() => logout()}>
                  <div style={{ border: '1px solid', borderRadius: '15px', padding: '3px 10px 4px 10px', fontSize: '16px', lineHeight: '20px' }}>Logout</div>
                </div>
                :

                <div style={{ cursor: 'pointer' }}>
                  <div style={{ border: '1px solid', borderRadius: '15px', padding: '3px 10px 4px 10px', fontSize: '16px', lineHeight: '20px' }}>
                    <Link href={'/sign-in'}>Login</Link>
                  </div>
                </div>
            }

            {screenWidth < lg &&
              <HamburgerMenu
                innerClassName={`w-4 h-px my-1 ${isHeroSecVisible ? "bg-primaryFont" : "bg-primaryFont"}`}
                isOpen={isOpen}
                onClick={toggleSidebar}
              />
            }
          </ul>

          <hr className={`
            design-line
            w-full absolute top-[93%] right-0
            ${isHeroSecVisible ? "border-primaryFont" : "border-primaryFont"}
          `} />
        </nav>

      </div>

      {/* <ManageSearch
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      /> */}
    </header>
  );
}