'use client';

import { useQuery } from '@tanstack/react-query';

import ProductsCarousel from '@/components/global/ProductsCarousel';
import Validation from "@/components/general/Validation";

import { getProductsAnalytics } from '@/utils/functions/api/cms/woocommerce/analytics';
import { useEffect, useState } from 'react';


export default function BestSeller() {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cms.jiaarajewellery.com/wp-json/custom/v1/products?page=2&per_page=10"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  if (isLoading) {
    return (
      <Validation
        className="w-full h-[10rem] text-primaryFont"
        message="Loading Best Selling Products…"
      />
    );
  }


  return (
    (isSuccess && data?.products?.length > 0) &&
    <ProductsCarousel
      className="best-seller"
      headingClassName="text-center text-2xl uppercase text-primaryFont"
      heading="Best Seller"
      carousel={{
        isPlaying: true,
        interval: 3000,
      }}
      sliderClassName="select-none cursor-grab active:cursor-grabbing"
      slideClassName="mx-[1.5vw]"
      slideInnerClassName="flex flex-col gap-3"
      data={{ products: data?.products, cartProduct: productList }}
    />
  );
}
