'use client';

import { useQuery } from "@tanstack/react-query";
import { useState,useEffect } from "react";
import BeautifulLayout from "@/components/global/beautiful-layout/BeautifulLayout";
import Validation from "@/components/general/Validation";

import { getCollections } from "@/utils/functions/api/cms/woocommerce/collections";

import { COLLECTIONS } from "@/routes";


export default function Collections({ className = "" }) {

  const [collections, setCollections] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollections = async (attempt = 0) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories?page=1&per_page=100&parent=0"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setCollections(result);
      setIsSuccess(true);
    } catch (err) {
      if (attempt < 10) {
        // Retry with exponential backoff (max 30 sec delay)
        setTimeout(() => fetchCollections(attempt + 1), Math.min(1000 * 2 ** attempt, 30000));
      } else {
        setError(err.message);
        setIsSuccess(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const collectionsUrl = isSuccess ?
    collections.map(collection => COLLECTIONS.getPathname(collection?.id)) : [];

  return (
    <section
      id="shop-by-collections"
      className={`grid items-center gap-y-12 ${className}`}
    >
      <h2 className={`font-heading text-center text-4xl capitalize text-primaryFont`}>
        {`Shop by ${COLLECTIONS?.title}`}
      </h2>

      {isLoading ?
        <Validation
          className="w-full h-[10rem] text-primaryFont"
          message="Loading Collections…"
        />
      :
        <BeautifulLayout
          className="collections"
          items = {{
            itemsArr: collections || [],
            urlsArr: collectionsUrl || []
          }}
        />
      }
    </section>
  );
}
