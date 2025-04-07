"use client";

import { useState, useEffect } from "react";

import ProductGrid from "@/components/global/ProductGrid";
import Pagination from "@/components/general/Pagination";
import Validation from "@/components/general/Validation";

import { useSelector } from "react-redux";

export default function ManageShop({ className = "", params }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(null); // ✅ Define categoryId state
  const buyNowItem = useSelector((state) => state?.userDataSlice);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(params)
  const { id } = params;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL(
        "https://cms.jiaarajewellery.com/wp-json/wc/v3/products"
      );
      url.searchParams.append(
        "consumer_key",
        "ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5"
      );
      url.searchParams.append(
        "consumer_secret",
        "cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6"
      );
      url.searchParams.append("status", "publish");
      url.searchParams.append("page", currentPage);
      url.searchParams.append("per_page", 20);

      if (id) {
        url.searchParams.append("category", id);
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId, currentPage]); // ✅ Added categoryId in dependency array

  if (loading) {
    return (
      <Validation
        className="w-screen h-[20rem] text-primaryFont"
        message="Loading Products…"
      />
    );
  }

  if (error) {
    return (
      <Validation
        className="w-screen h-[20rem] text-primaryFont"
        message="There is some error."
      />
    );
  }

  return (
    <div className={`flex flex-col gap-5 my-10 ${className}`}>
      <ProductGrid products={products || []} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={10} // Set a default totalPages or fetch from API
      />
    </div>
  );
}
