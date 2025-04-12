// pages/shop/[id].js or src/components/pages/shop/ManageShop.jsx
'use client'; // This marks the component as a Client Component

import { useState, useEffect } from "react";
import ProductGrid from "@/components/global/ProductGrid";
import Pagination from "@/components/general/Pagination";
import Validation from "@/components/general/Validation";
import { useSelector } from "react-redux";

export default function ManageShop({ className = "", params }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const buyNowItem = useSelector((state) => state?.userDataSlice);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params;
  const pageSize = 20;
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL("https://cms.jiaarajewellery.com/wp-json/wc/v3/products");
      url.searchParams.append("consumer_key", "ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5");
      url.searchParams.append("consumer_secret", "cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6");
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
  const nextPage = () => {
    if ((currentPage + 1) * pageSize < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [categoryId, currentPage]);

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
      {/* <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={10} // Set a default totalPages or fetch from API
      /> */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * pageSize >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
