"use client";

import { useState, useEffect } from "react";
import Axios from "axios";

import ProductsCarousel from "@/components/global/ProductsCarousel";
import SaleProductCard from "./components/SaleProductCard";
import UserProductsStatus from "@/components/global/UserProductsStatus";
import Validation from "@/components/general/Validation";

import { CATEGORIES } from "@/routes";
import splitInHalf from "@/utils/functions/general/splitInHalf";

const CategoriesTabs = UserProductsStatus;

export default function Sale() {
  const [categoryId, setCategoryId] = useState(null);
  const [parentCategories, setParentCategories] = useState([]); // Default empty array
  const [isParentCategoriesLoading, setIsParentCategoriesLoading] = useState(true);
  const [isParentCategoriesFetched, setIsParentCategoriesFetched] = useState(false);

  const [saleProducts, setSaleProducts] = useState([]);
  const [isSaleProductsLoading, setIsSaleProductsLoading] = useState(false);
  const [isSaleProductsFetched, setIsSaleProductsFetched] = useState(false);

  // Fetch Categories Directly
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get(
          "https://cms.jiaarajewellery.com/wp-json/cms/woocommerce/categories/getCategories?page=1&per_page=5&parent=0"
        );

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        setParentCategories(response.data);
        setIsParentCategoriesFetched(true);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setParentCategories([]); // Ensure default empty array to prevent issues
        setIsParentCategoriesFetched(false);
      } finally {
        setIsParentCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch Sale Products when categoryId changes
  useEffect(() => {
    if (!categoryId) return;

    const fetchSaleProducts = async () => {
      setIsSaleProductsLoading(true);
      try {
        const response = await Axios.get(
          `https://cms.jiaarajewellery.com/wp-json/cms/woocommerce/products/getProducts?page=1&per_page=100&categoryId=${categoryId}&onSale=true&status=publish`
        );

        if (!Array.isArray(response.data.products)) {
          throw new Error("Invalid response format for products");
        }

        setSaleProducts(response.data.products);
        setIsSaleProductsFetched(true);
      } catch (error) {
        console.error("Error fetching sale products:", error);
        setSaleProducts([]);
        setIsSaleProductsFetched(false);
      } finally {
        setIsSaleProductsLoading(false);
      }
    };

    fetchSaleProducts();
  }, [categoryId]);

  const requiredCategories = (categories) => {
    if (!Array.isArray(categories)) return [];
    return categories.filter((category) => category?.name !== "General");
  };

  const getActiveCategoryId = (activeCategoryId) => setCategoryId(activeCategoryId);

  const [upperSaleProductsArr, lowerSaleProductsArr] =
    isSaleProductsFetched && splitInHalf(saleProducts) || [];

  const createNewObj = (data) => ({
    user_id: "",
    cart_id: "",
    created_date: "",
    product_id: data?.id,
    quantity: 0,
    img: data?.image,
    price: data?.price,
    name: data?.name,
    status: "s",
  });

  const productList = saleProducts.map(createNewObj);

  if (isParentCategoriesLoading) {
    return (
      <Validation className="w-full h-[10rem] text-primaryFont" message="Loading Sale Products…" />
    );
  }

  return (
    <section id="sale" className="flex flex-col items-center justify-center gap-10">
      <h2 className="heading text-4xl uppercase text-primaryFont">Sale</h2>

      {isParentCategoriesFetched && parentCategories.length > 0 && (
        <CategoriesTabs
          className="
            px-[8vw] gap-[6vw]
            text-xs
            text-primaryFont
            2xs:text-sm
            xs:text-base
            sm:text-lg
            md:gap-x-16 md:gap-y-7
            md:text-xl
          "
          titles={requiredCategories(parentCategories)}
          forTab={true}
          callback={getActiveCategoryId}
        />
      )}

      {isSaleProductsLoading ? (
        <Validation className="w-full h-[20rem] text-primaryFont" message="Loading Products…" />
      ) : (
        <>
          {upperSaleProductsArr?.length > 0 ? (
            <ProductsCarousel
              className="upper-sale-products"
              headingClassName="text-center text-2xl uppercase text-primaryFont"
              carousel={{ interval: 3000 }}
              sliderClassName="sales-products-slider select-none cursor-grab active:cursor-grabbing"
              slideClassName="mx-[3vw]"
              slideInnerClassName="flex flex-col gap-10"
              data={{
                products: upperSaleProductsArr,
                cartProduct: productList,
                productComponent: <SaleProductCard />,
              }}
              visibleSlides={{
                desktop: 3,
                tablet: 2,
                mobile: 1,
              }}
            />
          ) : (
            <Validation className="w-full h-[15rem] text-primaryFont" message="Currently, no products." />
          )}

          {lowerSaleProductsArr?.length > 0 && (
            <ProductsCarousel
              className="lower-sale-products"
              headingClassName="text-center text-2xl uppercase text-primaryFont"
              carousel={{ interval: 3000 }}
              sliderClassName="sales-products-slider select-none cursor-grab active:cursor-grabbing"
              slideClassName="mx-[3vw]"
              slideInnerClassName="flex flex-col gap-10"
              data={{
                products: lowerSaleProductsArr,
                cartProduct: productList,
                productComponent: <SaleProductCard />,
              }}
              visibleSlides={{
                desktop: 3,
                tablet: 2,
                mobile: 1,
              }}
            />
          )}
        </>
      )}
    </section>
  );
}
