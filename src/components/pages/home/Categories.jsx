"use client";

import { useEffect, useState } from "react";
import Axios from "axios";

import BeautifulLayout from "@/components/global/beautiful-layout/BeautifulLayout";
import Validation from "@/components/general/Validation";

import { CATEGORIES } from "@/routes";

export default function Categories({ className = "" }) {
  const [parentCategories, setParentCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch Categories Directly (Without useQuery)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get(
          "https://cms.jiaarajewellery.com/wp-json/cms/woocommerce/categories/getCategories?page=1&per_page=5&parent=0"
        );
        setParentCategories(response.data);
        setIsSuccess(true);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const requiredCategories = isSuccess
    ? parentCategories?.filter((category) => category?.name !== "General")
    : [];

  const parentCategoriesUrl = isSuccess
    ? parentCategories.map((category) => CATEGORIES?.getPathname(category?.id))
    : [];

  return (
    <section
      id="shop-by-categories"
      className={`grid items-center gap-y-12 ${className}`}
    >
      <h2 className="heading text-center text-4xl uppercase text-primaryFont">
        {`Shop by ${CATEGORIES?.title}`}
      </h2>

      {isLoading ? (
        <Validation
          className="w-full h-[10rem] text-primaryFont"
          message="Loading Categories…"
        />
      ) : (
        <BeautifulLayout
          className="categories"
          items={{
            itemsArr: requiredCategories || [],
            urlsArr: parentCategoriesUrl || [],
          }}
        />
      )}
    </section>
  );
}
