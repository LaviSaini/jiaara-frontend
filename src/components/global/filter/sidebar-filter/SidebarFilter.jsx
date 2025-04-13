"use client";

import { useEffect, useState, useContext } from "react";
import { context } from "@/context-API/context";
import { storeData } from "@/context-API/actions/action.creators";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Sidebar from "@/components/general/Sidebar";
import Accordion from "@/components/general/Accordion";

import PriceFilter from "@/components/global/filter/sidebar-filter/components/PriceFilter";
import CategoriesFilter from "@/components/global/filter/sidebar-filter/components/CategoriesFilter";
import CollectionsFilter from "@/components/global/filter/sidebar-filter/components/CollectionsFilter";

import useSidebarUtils from "@/utils/hooks/sidebar/useSidebarUtils";
import { getCollections } from "@/utils/functions/api/cms/woocommerce/collections";

import { CATEGORIES, COLLECTIONS } from "@/routes";

export default function SidebarFilter({ className = "" }) {
  const [parentCategories, setParentCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isCategoriesSuccess, setIsCategoriesSuccess] = useState(false);

  // Fetch Categories Directly (Without useQuery)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get(
          "https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories"
        );
        setParentCategories(response.data);
        setIsCategoriesSuccess(true);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsCategoriesSuccess(false);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch Collections Using useQuery
  const [collections, setCollections] = useState(null);
  const [isCollectionsLoading, setIsCollectionsLoading] = useState(true);
  const [isCollectionsSuccess, setIsCollectionsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollections = async (attempt = 0) => {
    setIsCollectionsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories?parent=15"
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

  const { dispatch } = useContext(context);
  const { sidebarState: [isOpen, setIsOpen], innerRef } = useSidebarUtils();

  useEffect(() => {
    function storeComponentData() {
      dispatch(storeData({ sidebar: [isOpen, setIsOpen] }, "states"));
    }
    storeComponentData();
  }, [isOpen, setIsOpen, dispatch]);

  const closeSidebar = () => setIsOpen(false);

  return (
    <Sidebar
      innerRef={innerRef}
      className={`filter ${className}`}
      innerClassName="w-[inherit] xs:w-[20rem] px-3 bg-white"
      isOpen={isOpen} 
      setIsOpen={setIsOpen}
    >
      <div className="wrapper flex justify-between sticky top-0 px-3 py-5 z-10 border-b uppercase font-medium bg-white">
        <div className="heading">Filter Products</div>
        <button className="close-btn" onClick={closeSidebar}>
          <IoCloseOutline className="cross-icon text-xl" />
        </button>
      </div>

      <ul className="filter-cont flex flex-col px-3">
        {/* Price Filter */}
        <li className="price-filter">
          <Accordion
            className="border-primaryFont text-sm"
            titleClassName="uppercase font-medium"
            title="Price Filter"
            defaultState={true}
            contentClassName="py-3"
            content={<PriceFilter className="px-5" />}
            iconClassName="text-xl"
            openIcon={MdOutlineKeyboardArrowDown}
            closeIcon={MdOutlineKeyboardArrowUp}
            divider={{ upper: { isEnabled: true }, bottom: { isEnabled: true } }}
            unmountOnExit={false}
          />
        </li>

        {/* Categories Filter */}
        <li className="categories-filter">
          <Accordion
            className="border-primaryFont text-sm"
            titleClassName="uppercase font-medium"
            title={CATEGORIES?.title}
            defaultState={true}
            contentClassName="py-3"
            content={
              <CategoriesFilter
                className="px-5"
                categories={isCategoriesSuccess ? parentCategories : []}
              />
            }
            iconClassName={isLoadingCategories ? "animate-spin" : "text-xl"}
            openIcon={isLoadingCategories ? AiOutlineLoading3Quarters : MdOutlineKeyboardArrowDown}
            closeIcon={isLoadingCategories ? AiOutlineLoading3Quarters : MdOutlineKeyboardArrowUp}
            divider={{ upper: { isEnabled: true }, bottom: { isEnabled: true } }}
            unmountOnExit={false}
          />
        </li>

        {/* Collections Filter */}
        <li className="collections-filter">
          <Accordion
            className="border-primaryFont text-sm"
            titleClassName="uppercase font-medium"
            title={COLLECTIONS?.title}
            defaultState={true}
            contentClassName="py-3"
            content={
              <CollectionsFilter
                className="px-5"
                collections={isCollectionsSuccess ? collections : []}
              />
            }
            iconClassName={isCollectionsLoading ? "animate-spin" : "text-xl"}
            openIcon={isCollectionsLoading ? AiOutlineLoading3Quarters : MdOutlineKeyboardArrowDown}
            closeIcon={isCollectionsLoading ? AiOutlineLoading3Quarters : MdOutlineKeyboardArrowUp}
            divider={{ upper: { isEnabled: true }, bottom: { isEnabled: true } }}
            unmountOnExit={false}
          />
        </li>
      </ul>
    </Sidebar>
  );
}
