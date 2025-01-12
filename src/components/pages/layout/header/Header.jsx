'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState, useContext, useEffect } from 'react';
import { context } from "@/context-API/context";

import { useSelector } from 'react-redux';

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

const { HOME, SHOP, CATEGORIES, COLLECTIONS, CART, WISHLIST, SEARCH } = getAllRoutes();

const brandLogo = {
  white: "/assets/logos/jiaara-white.png",
  black: "/assets/logos/jiaara-black.png"
};


export default function Header() {

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


  const {
    data: parentCategories,
    isLoading: isParentCategoriesLoading,
    isSuccess: isParentCategoriesSuccess
  } =
    useQuery({
      queryKey: ['parent-categories'],
      queryFn: () => getCategories({ parent: 0 }),
      retry: 10,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    });

  useEffect(() => {
    console.log("header")
  }, [])
  const {
    data: collections,
    isLoading: isCollectionsLoading,
    isSuccess: isCollectionsSuccess
  } =
    useQuery({
      queryKey: ['general-collections'],
      queryFn: getCollections,
      retry: 10,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    });


  const totalCartItems = useSelector(
    state => state?.cartReducer?.reduce((sum, item) => sum + item?.cartQtyCount, 0) ?? 0
  );
  const totalWishlistItems = useSelector(state => state?.wishlistReducer?.length ?? 0);


  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header
      id="header"
      className={`
        w-full flex items-center fixed px-3 py-1 z-20
        ${isHeroSecVisible ? "bg-transparent" : "bg-secondaryBackground"}
        md:px-5 lg:px-10
      `}
    >

      <Link className="app-brand img-cont-wrapper" href={HOME?.pathname}>
        <div className="img-cont size-[100px] relative">
          <Image
            fill
            src={isHeroSecVisible ? brandLogo?.white : brandLogo?.black}
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
                    ${isHeroSecVisible ? "lg:text-white" : "lg:text-primaryFont"}
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
                    ${isHeroSecVisible ? "lg:text-white" : "lg:text-primaryFont"}
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
                      ${isHeroSecVisible ? "text-white" : "text-primaryFont"}
                    `,
                    defaultValue: CATEGORIES?.title,
                    icon: {
                      className: `
                        mb-1 text-lg
                        ${isHeroSecVisible ? "text-white" : "text-primaryFont"}
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
                      "backdrop-blur bg-opacity-20 bg-white text-white" :
                      "bg-secondaryBackground text-primaryFont"
                    }   
                  `}
                  options={isParentCategoriesSuccess ? requiredCategories(parentCategories) : []}
                  optionClassName={{
                    hover: `
                      ${isHeroSecVisible ?
                        "hover:backdrop-blur hover:bg-opacity-[1%] hover:bg-white hover:text-white" :
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
                      ${isHeroSecVisible ? "text-white" : "text-primaryFont"}
                    `,
                    defaultValue: COLLECTIONS?.title,
                    icon: {
                      className: `
                        mb-1 text-lg
                        ${isHeroSecVisible ? "text-white" : "text-primaryFont"}
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
                      "backdrop-blur bg-opacity-20 bg-white text-white" :
                      "bg-secondaryBackground text-primaryFont"
                    }   
                  `}
                  options={isCollectionsSuccess ? requiredCollections(collections) : []}
                  optionClassName={{
                    hover: `
                      ${isHeroSecVisible ?
                        "hover:backdrop-blur hover:bg-opacity-[1%] hover:bg-white hover:text-white" :
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
            ${isHeroSecVisible ? "text-white" : "text-primaryFont"}
          `}>
            {[WISHLIST, CART].map(route =>
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
                        ${isHeroSecVisible ? "backdrop-blur bg-opacity-50 bg-white" : "bg-primaryFont"}
                      `,
                      textColor: "text-white"
                    },
                    isBadgeEnabled: route?.isBadgeEnabled
                  }
                }}
                enabled={enableNavItem(route, [], lg)}
              />
            )}
            {screenWidth < lg &&
              <HamburgerMenu
                innerClassName={`w-4 h-px my-1 ${isHeroSecVisible ? "bg-white" : "bg-primaryFont"}`}
                isOpen={isOpen}
                onClick={toggleSidebar}
              />
            }
          </ul>

          <hr className={`
            design-line
            w-full absolute top-[93%] right-0
            ${isHeroSecVisible ? "border-white" : "border-primaryFont"}
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