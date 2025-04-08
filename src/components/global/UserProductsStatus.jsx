'use client';

import { useState, useEffect, useCallback } from "react";

import useRouteActive from "@/utils/hooks/general/useRouteActive";

import { CART, CHECKOUT, ORDER } from "@/routes";

const FIRST_TAB_INDEX = 0;


function UserProductsStatus({
  className = "",
  titleClassName = "",
  titles = [
    { name: CART?.title, url: CART?.pathname },
    { name: CHECKOUT?.title, url: CHECKOUT?.pathname },
    { name: ORDER?.title, url: "" }
  ],
  forTab = false,
  callback = () => { }
}) {

  const { isRouteActive } = useRouteActive();

  const [currentActiveTab, setCurrentActiveTab] = useState(FIRST_TAB_INDEX);
  const [isInitialized, setIsInitialized] = useState(false);

  const manageCurrentActiveTab = useCallback(({ index = null, titleId = null }) => {

    if (currentActiveTab === index) {
      return;
    }

    if (titleId !== null) {
      callback(titleId);
    }

    if (index !== null) {
      setCurrentActiveTab(index);
    }
  }, [currentActiveTab, callback]);


  useEffect(() => {

    if (!isInitialized) {

      const initialTitleId = titles[0]?.id;

      if (initialTitleId !== null && initialTitleId !== undefined) {
        callback(initialTitleId);
        setIsInitialized(true);
      }
    }
  }, [isInitialized, titles, callback]);


  const isCurrentTabActive = index => currentActiveTab === index;


  const getActiveClassName = (index, titleUrl = null) => {
    if (
      (forTab && isCurrentTabActive(index)) ||
      (!forTab && titleUrl && isRouteActive(titleUrl))
    ) {
      return "font-semibold underline underline-offset-[15px] decoration-2";
    }
  };


  return (
    <div className={`
      user-products-status
      w-full
      flex flex-wrap justify-center items-center
      ${className}
    `}
    >
      {titles.map((title, index) =>
        <button
          key={index}
          className={`
            ${titleClassName}
            ${getActiveClassName(index, title?.url)}
          `}
          onClick={() => manageCurrentActiveTab({ index, titleId: title?.id })}
        >
          {title?.name}
        </button>
      )}
    </div>
  );
}

export default UserProductsStatus;