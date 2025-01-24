import { useQuery } from "@tanstack/react-query";

import ProductsCarousel from "@/components/global/ProductsCarousel";

import { getProductsByIds } from "@/utils/functions/api/cms/woocommerce/products";
import { useEffect, useState } from "react";


export default function RelatedProducts({ currentProductId = null, relatedProductIds = [] }) {

  const { data, isSuccess } = useQuery({
    queryKey: [`related-products-${currentProductId}`],
    queryFn: () => getProductsByIds({ ids: relatedProductIds })
  });

  const { products } = data || [];
  const [cartProduct, setcartproduct] = useState([])
  useEffect(() => {
    const newArrat = products?.map((element) => {
      return creatNewObj(element)
    })
    setcartproduct(newArrat)
  }, [products])
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
  return (
    <section id="related-products">
      {isSuccess && products.length > 0 &&
        <ProductsCarousel
          className="related-products pb-12"
          headingClassName="text-center text-2xl uppercase text-primaryFont"
          heading="Related Products"
          sliderClassName="select-none cursor-grab active:cursor-grabbing"
          slideClassName="mx-[2.5vw]"
          slideInnerClassName="flex flex-col gap-3"
          data={{ products, cartProduct: cartProduct }}
        />
      }
    </section>
  );
}