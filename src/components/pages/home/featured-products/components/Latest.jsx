'use client';

import ProductsCarousel from '@/components/global/ProductsCarousel';
import Validation from "@/components/general/Validation";
import { useEffect, useState } from 'react';
import createObjCommanFunction from '@/utils/functions/general/createCartWishlistObje';

export default function Latest() {
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://cms.jiaarajewellery.com/wp-json/wc/v3/products?consumer_key=ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5&consumer_secret=cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const newArray = products.map((element) => creatNewObj(element));
      setProductList(newArray);
    }
  }, [products]);

  const creatNewObj = (data) => {
    return createObjCommanFunction(data);
  };

  if (loading) {
    return (
      <Validation
        className="w-full h-[10rem] text-primaryFont"
        message="Loading Latest Products…"
      />
    );
  }

  if (error) {
    return (
      <Validation
        className="w-full h-[10rem] text-red-600"
        message={`Error: ${error}`}
      />
    );
  }

  return (
    products.length > 0 && (
      <ProductsCarousel
        className="latest-products"
        headingClassName="text-center text-2xl uppercase text-primaryFont"
        heading="Latest"
        carousel={{
          isPlaying: true,
          interval: 3000,
          playDirection: "backward"
        }}
        sliderClassName="select-none cursor-grab active:cursor-grabbing"
        slideClassName="mx-[1.5vw]"
        slideInnerClassName="flex flex-col gap-3"
        data={{ products, cartProduct: productList }}
      />
    )
  );
}
