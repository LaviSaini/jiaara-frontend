import { useQuery } from "@tanstack/react-query";

import ProductsCarousel from "@/components/global/ProductsCarousel";

import { getProductsByIds } from "@/utils/functions/api/cms/woocommerce/products";
import { useEffect, useState } from "react";


export default function RelatedProducts({ currentProductId = null, relatedProductIds = [] }) {

  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchRelatedProducts = async () => {
    if (!relatedProductIds || relatedProductIds.length === 0) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const idsQuery = relatedProductIds.map(id => `${id}`).join(",");
      const url = `https://cms.jiaarajewellery.com/wp-json/wc/v3/products?include=${idsQuery}&consumer_key=ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5&consumer_secret=cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      setProductList(result);
      const newArr = result.map((element) => creatNewObj(element));
      setCartProduct(newArr)
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching related products:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const [product, setProductList] = useState([])
  const [cartProduct, setCartProduct] = useState([]);
  useEffect(() => {
    fetchRelatedProducts();
  }, [currentProductId, relatedProductIds]);

  // const { products } = data || [];
  // const [cartProduct, setcartproduct] = useState([])
  // useEffect(() => {
  //   const newArrat = products?.map((element) => {
  //     return creatNewObj(element)
  //   })
  //   setcartproduct(newArrat)
  // }, [products])
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
      {product.length > 0 &&
        <ProductsCarousel
          className="related-products pb-12"
          headingClassName="text-center text-2xl uppercase text-primaryFont"
          heading="Related Products"
          sliderClassName="select-none cursor-grab active:cursor-grabbing"
          slideClassName="mx-[2.5vw]"
          slideInnerClassName="flex flex-col gap-3"
          data={{ products: product, cartProduct: cartProduct }}
        />
      }
    </section>
  );
}