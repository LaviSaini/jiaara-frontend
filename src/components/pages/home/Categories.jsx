"use client";

import { useEffect, useState } from "react";
import Axios from "axios";

import BeautifulLayout from "@/components/global/beautiful-layout/BeautifulLayout";
import Validation from "@/components/general/Validation";

import { CATEGORIES } from "@/routes";
import { getCategorywpSevice } from "@/app/api/cms/nodeapi/DetailService";

export default function Categories({ className = "" }) {
  const [parentCategories, setParentCategories] = useState([]); // Default to an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch Categories Directly (Without useQuery)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const response = await Axios.get(
        //   "https://cms.jiaarajewellery.com/wp-json/cms/woocommerce/categories/getCategories?page=1&per_page=5&parent=0"
        // );

        // if (!Array.isArray(response.data)) {
        //   throw new Error("Invalid response format");
        // }
        const response = await getCategorywpSevice();
        setParentCategories(response);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  // debugger
  const requiredCategories = Object.values(parentCategories)?.filter(
    (category) => category?.name !== "General"
  ) || [];

  const parentCategoriesUrl = requiredCategories.map((category) =>
    CATEGORIES?.getPathname(category?.id)
  );

  return (
    <section
      id="shop-by-categories"
      className={`grid items-center gap-y-12 ${className}`}
    >
      <h2 className="font-heading text-center text-4xl capitalize text-primaryFont">
        {`Shop by ${CATEGORIES?.title}`}
      </h2>

      {isLoading ? (
        <Validation
          className="w-full h-[10rem] text-primaryFont"
          message="Loading Categories…"
        />
      ) : isError ? (
        <Validation
          className="w-full h-[10rem] text-red-500"
          message="Error fetching categories. Please try again."
        />
      ) : requiredCategories.length === 0 ? (
        <Validation
          className="w-full h-[10rem] text-primaryFont"
          message="No categories available."
        />
      ) : (
        <BeautifulLayout
          className="categories"
          items={{
            itemsArr: requiredCategories,
            urlsArr: parentCategoriesUrl,
          }}
        />
      )}
    </section>
  );
}
