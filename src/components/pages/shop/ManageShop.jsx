'use client';

import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import ProductGrid from "@/components/global/ProductGrid";

import Pagination from "@/components/general/Pagination";
import Validation from "@/components/general/Validation";

import { getProducts } from "@/utils/functions/api/cms/woocommerce/products";
import { useDispatch, useSelector } from "react-redux";
import { userdata } from "@/redux/slices/userdata";


export default function ManageShop({ className = "", params }) {

  const [currentPage, setCurrentPage] = useState(1);
  const buyNowItem = useSelector(state => state?.userDataSlice)
  const {
    data: productsData,
    isLoading,
    isFetching,
    isError,
    refetch: fetchProducts
  }
    = useQuery({
      queryKey: ["products", params?.id || ""],
      queryFn: () => getProducts({
        categoryId: params?.id || null,
        paginate: true,
        page: currentPage,
        perPage: 20,
        status: "publish"
      }),
      keepPreviousData: true
    });

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);


  if (isLoading || isFetching) {
    return (
      <Validation
        className="w-screen h-[20rem] text-primaryFont"
        message="Loading Products…"
      />
    );
  }

  if (isError) {
    return (
      <Validation
        className="w-screen h-[20rem] text-primaryFont"
        message="There is some error."
      />
    );
  }

  // const dispatch = useDispatch();
  // dispatch(userdata.add({ userId: '78967987' }))

  return (
    <div className={`flex flex-col gap-5 my-10 ${className}`}>
      <ProductGrid
        products={productsData?.products || []}
      />
      {productsData?.storeInfo?.totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={productsData?.storeInfo?.totalPages}
        />
      )}
    </div>
  );
}