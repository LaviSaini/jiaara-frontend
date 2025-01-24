'use client';

import { useQuery } from '@tanstack/react-query';

import ProductsCarousel from '@/components/global/ProductsCarousel';
import Validation from '@/components/general/Validation';

import { getProductsAnalytics } from '@/utils/functions/api/cms/woocommerce/analytics';
import { useEffect, useState } from 'react';


export default function Trending() {

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['trending-products'],
    queryFn: () => getProductsAnalytics({
      paginate: true,
      page: 1,
      perPage: 10,
      period: "month",
      orderby: "items_sold",
      order: "desc",
      status: "publish"
    })
  });
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
        message="Loading Trending Products…"
      />
    );
  }

  return (
    ((isSuccess && data?.products?.length > 0) &&
      <ProductsCarousel
        className="trending"
        headingClassName="text-center text-2xl uppercase text-primaryFont"
        heading="Trending"
        carousel={{
          isPlaying: true,
          interval: 3000
        }}
        sliderClassName="select-none cursor-grab active:cursor-grabbing"
        slideClassName="mx-[1.5vw]"
        slideInnerClassName="flex flex-col gap-3"
        data={{ products: data?.products, cartProduct: productList }}
      />
    )
  );
}
