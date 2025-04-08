'use client';

import { useQuery } from "@tanstack/react-query";

import ProductDisplay from "@/components/pages/product/components/product-display/ProductDisplay";
import KeyBenefits from "@/components/global/key-benefits/KeyBenefits";
import RelatedProducts from "@/components/pages/product/components/RelatedProducts";
import Validation from "@/components/general/Validation";

import { getProductsByIds } from "@/utils/functions/api/cms/woocommerce/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loaderData } from "@/redux/slices/loader";


export default function ManageProduct({ className = "", params }) {

  const { id } = params;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    if (!id) return;
    setIsLoading(true);
    setIsError(false);

    try {
      // const url = `https://cms.jiaarajewellery.com/wp-json/wp/v2/getRelatedProduct?product_ids[]=${id}`;
      // const response = await fetch(url);

      // if (!response.ok) {
      //   throw new Error(`Error: ${response.statusText}`);
      // }
      // const url2 = `https://cms.jiaarajewellery.com/wp-json/custom-api/v1/products?product_id=${id}`;
      // const response2 = await fetch(url2);
      // const resul2 = await response2.json();
      // // const result = await response.json();
      // setData(resul2?.product);
      // setIsSuccess(true);
      const url = `https://cms.jiaarajewellery.com/wp-json/wc/v3/products/${id}?consumer_key=ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5&consumer_secret=cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6`;
      const response = await fetch(url);
      const result = await response.json();
      // console.log('sdfkjlsfd', result)
      setData(result)

      setIsSuccess(true)
    } catch (error) {
      setIsError(true);
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    dispatch(loaderData.clear())
  }, [id]);

  // if (isNaN(id)) {
  //   return (
  //     <Validation
  //       className="w-screen h-[20rem] text-primaryFont"
  //       message="Not a Valid Product URL"
  //     />
  //   );
  // }

  if (isLoading) {
    return (
      <Validation
        className="w-screen h-[20rem] text-primaryFont"
        message="Loading Product…"
      />
    );
  }

  const { products: [product] = [] } = data || {};


  // if (!product || Object.keys(product).length <= 0 || isError) {
  //   return (
  //     <Validation
  //       className="w-screen h-[20rem] text-primaryFont"
  //       message="Not a Valid Product URL"
  //     />
  //   );
  // }


  return (
    (isSuccess &&
      <div className={`${className}-${id} flex flex-col gap-12`}>
        <ProductDisplay product={data} />
        <KeyBenefits />
        <RelatedProducts
          currentProductId={id}
          relatedProductIds={data?.related_ids}
        />
      </div>
    )
  );
}