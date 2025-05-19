// pages/shop/[id].js or src/components/pages/shop/d.jsx
'use client'; // This marks the component as a Client Component

import { useState, useEffect } from "react";
import ProductGrid from "@/components/global/ProductGrid";
import Pagination from "@/components/general/Pagination";
import Validation from "@/components/general/Validation";
import { useSelector } from "react-redux";

export default function ManageShop({ className = "", params, fromSearch, otherClasses = '',data,searchCallBack }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const buyNowItem = useSelector((state) => state?.userDataSlice);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProduct, setTotalProduct] = useState(0);
  const { id } = params || {};
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
      if (fromSearch) {
        url.searchParams.append("category", 87);

      } else {
        url.searchParams.append("category", id);
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      let arr = [];
      const keys = Object.keys(data).slice(0, Object.keys(data).length - 1);
      keys.forEach((element) => {
        arr.push(data[element])
      })

      const page = Math.ceil(data['total_products'] / 20)
      setTotalProduct(page);
      setProducts(arr);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    if(!fromSearch){
      fetchProducts();
    } 
  }, [categoryId, currentPage]);
  useEffect(()=>{
    if(data){
      setCurrentPage(data?.data?.page)
      setTotalProduct(data?.data?.total_pages);
      setProducts(data?.data?.products);
      setLoading(false);

    }
  },[data,products,currentPage])

  if (loading) {
    return (
      <Validation
        className={`${fromSearch ? '' : 'w-screen'} h-[20rem] text-primaryFont`}
        message="Loading Products…"
      />
    );
  }

  if (error) {
    return (
      <Validation
        className={`${fromSearch ? '' : 'w-screen'} h-[20rem] text-primaryFont`}
        message="There is some error."
      />
    );
  }

  return (
    <div className={`flex flex-col gap-5 ${fromSearch ? '' : 'my-10 '} ${className}`}>
      <ProductGrid products={products || []} otherClasses={otherClasses} />
      {<Pagination
        currentPage={currentPage}
        setCurrentPage={fromSearch?searchCallBack:setCurrentPage}
        totalPages={totalProduct} // Set a default totalPages or fetch from API
      />}
      {/* <div style={{ marginTop: '20px' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * pageSize >= products.length}
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
