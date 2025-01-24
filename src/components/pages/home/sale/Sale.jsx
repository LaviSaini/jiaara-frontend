'use client';

import { useState, useEffect } from 'react';

import { useQuery } from "@tanstack/react-query";

import ProductsCarousel from '@/components/global/ProductsCarousel';
import SaleProductCard from "./components/SaleProductCard";
import UserProductsStatus from '@/components/global/UserProductsStatus';
import Validation from '@/components/general/Validation';

import { getCategories } from '@/utils/functions/api/cms/woocommerce/categories';
import { getProducts } from '@/utils/functions/api/cms/woocommerce/products';

import splitInHalf from "@/utils/functions/general/splitInHalf";

const CategoriesTabs = UserProductsStatus;


export default function Sale() {

  const [categoryId, setCategoryId] = useState(null);

  const {
    data: parentCategories,
    isSuccess: isParentCategoriesFetched,
    isLoading: isParentCategoriesLoading,
  }
    = useQuery({
      queryKey: ['parent-categories'],
      queryFn: () => getCategories({ parent: 0 }),
      retry: 10,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    });

  const requiredCategories = categories =>
    categories.filter(category => category.name !== "General");

  const getActiveCategoryId = activeCategoryId =>
    setCategoryId(activeCategoryId);


  const {
    data,
    isLoading: isSaleProductsLoading,
    isSuccess: isSaleProductsFetched,
    refetch: fetchSalesProducts
  }
    = useQuery({
      queryKey: [`sale-products-${categoryId}`],
      queryFn: () =>
        getProducts({
          page: 1,
          perPage: 100,
          categoryId,
          onSale: true,
          status: "publish"
        }),
      enabled: false
    });

  useEffect(() => {
    fetchSalesProducts();
  }, [categoryId, fetchSalesProducts])
  const [productList, setProductList] = useState([])
  useEffect(() => {
    const newArray = data?.products?.map((element) => {
      return creatNewObj(element)
    })
    setProductList(newArray)
  }, [data])
  const creatNewObj = (data) => {
    const reqObj = {

      "user_id": '',
      "cart_id": '',
      "created_date": '',
      "product_id": data?.id,
      "quantity": 0,
      "img": data?.image,
      "price": data?.price,
      "name": data?.name,
      "status": 's'

    }
    return reqObj
  }
  if (isParentCategoriesLoading) {
    return (
      <Validation
        className="w-full h-[10rem] text-primaryFont"
        message="Loading Sale Products…"
      />
    );
  }


  const [upperSaleProductsArr, lowerSaleProductsArr]
    = isSaleProductsFetched && splitInHalf(data?.products) || [];


  return (
    <section id="sale" className="flex flex-col items-center justify-center gap-10">
      <h2 className="heading text-4xl uppercase text-primaryFont">
        Sale
      </h2>

      {isParentCategoriesFetched &&
        <CategoriesTabs
          className={`
            px-[8vw] gap-[6vw]
            text-xs
            text-primaryFont
            2xs:text-sm
            xs:text-base
            sm:text-lg
            md:gap-x-16 md:gap-y-7
            md:text-xl
          `}
          titles={requiredCategories(parentCategories) || []}
          forTab={true}
          callback={getActiveCategoryId}
        />
      }

      {isSaleProductsLoading ?
        <Validation
          className="w-full h-[20rem] text-primaryFont"
          message="Loading Products…"
        />
        :
        <>
          {upperSaleProductsArr?.length > 0 ?
            <ProductsCarousel
              className="upper-sale-products"
              headingClassName="text-center text-2xl uppercase text-primaryFont"
              carousel={{
                interval: 3000
              }}
              sliderClassName="sales-products-slider select-none cursor-grab active:cursor-grabbing"
              slideClassName="mx-[3vw]"
              slideInnerClassName="flex flex-col gap-10"
              data={{
                products: upperSaleProductsArr,
                cartProduct: productList,
                productComponent: <SaleProductCard />
              }}
              visibleSlides={{
                desktop: 3,
                tablet: 2,
                mobile: 1
              }}
            />
            :
            <Validation
              className="w-full h-[15rem] text-primaryFont"
              message="Currently, no products."
            />
          }

          {lowerSaleProductsArr?.length > 0 &&
            <ProductsCarousel
              className="lower-sale-products"
              headingClassName="text-center text-2xl uppercase text-primaryFont"
              carousel={{
                interval: 3000
              }}
              sliderClassName="sales-products-slider select-none cursor-grab active:cursor-grabbing"
              slideClassName="mx-[3vw]"
              slideInnerClassName="flex flex-col gap-10"
              data={{
                products: lowerSaleProductsArr,
                cartProduct: productList,
                productComponent: <SaleProductCard />
              }}
              visibleSlides={{
                desktop: 3,
                tablet: 2,
                mobile: 1
              }}
            />
          }
        </>
      }
    </section>
  );
}