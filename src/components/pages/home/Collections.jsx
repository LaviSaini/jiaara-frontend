'use client';
import Image from "next/image";
const assetsDirPath = "/assets/pages/homepage/celebrities";

const collections = [
  { title: "18k Gold", image: `${assetsDirPath}/1.jpg`, link: "#" },
  { title: "Brass", image: `${assetsDirPath}/2.jpg`, link: "#" },
  { title: "For Him", image: `${assetsDirPath}/3.jpg`, link: "#" },
  { title: "Ethnic", image: `${assetsDirPath}/4.jpg`, link: "#" },
  { title: "Minimalist", image: `${assetsDirPath}/5.jpg`, link: "#" },
];

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import BeautifulLayout from "@/components/global/beautiful-layout/BeautifulLayout";
import Validation from "@/components/general/Validation";

import { getCollections } from "@/utils/functions/api/cms/woocommerce/collections";

import { COLLECTIONS } from "@/routes";


export default function Collections({ className = "" }) {

  // const [collections, setCollections] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [error, setError] = useState(null);

  // const fetchCollections = async (attempt = 0) => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch(
  //       "https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories?page=1&per_page=100&parent=0"
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }

  //     const result = await response.json();
  //     setCollections(result);
  //     setIsSuccess(true);
  //   } catch (err) {
  //     if (attempt < 10) {
  //       // Retry with exponential backoff (max 30 sec delay)
  //       setTimeout(() => fetchCollections(attempt + 1), Math.min(1000 * 2 ** attempt, 30000));
  //     } else {
  //       setError(err.message);
  //       setIsSuccess(false);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCollections();
  // }, []);

  // const collectionsUrl = isSuccess ?
  //   collections.map(collection => COLLECTIONS.getPathname(collection?.id)) : [];

  return (
    <section
      id="shop-by-collections"
      className={`grid items-center gap-y-12 ${className}`}
    >
      <h2 className={`font-heading text-center text-4xl capitalize text-primaryFont`}>
        Collections
      </h2>
      <div className="w-full px-5 mx-auto sm:px-7 md:px-10 lg:px-16">

        <div className="flex gap-6">
        <div className="w-96 flex-none">
          <a
            href={collections?.[0].link}
            className="relative group overflow-hidden rounded-2xl"
          >
            <Image
              src={collections?.[0].image}
              // alt={item.title}
              width={400}
              height={300}
              className={`w-full h-56 sm:h-48 md:h-52 lg:h-72 object-cover rounded-2xl`}
            />
            <div className="absolute bottom-0 left-0 w-full text-white p-3 flex justify-between items-center">
              <span className="font-heading text-2xl font-medium">{collections?.[0].title}</span>
              <span className="text-xl border rounded-full px-2 py-1">→</span>
            </div>
          </a>
          </div>
          <div className="w-96 flex-1">
            <a
            href={collections?.[1].link}
            className="relative group overflow-hidden rounded-2xl"
          >
            <Image
              src={collections?.[1].image}
              // alt={item.title}
              width={400}
              height={300}
              className={`w-full h-56 sm:h-48 md:h-52 lg:h-72 object-cover rounded-2xl`}
            />
            <div className="absolute bottom-0 left-0 w-full text-white p-3 flex justify-between items-center">
              <span className="font-heading text-2xl font-medium">{collections?.[1].title}</span>
              <span className="text-xl border rounded-full px-2 py-1">→</span>
            </div>
          </a>
          </div>
        </div>
        <div className="flex gap-6 mt-6">
          <div className="w-auto flex-none">
            <a
            href={collections?.[2].link}
            className="relative group overflow-hidden rounded-2xl"
          >
            <Image
              src={collections?.[2].image}
              // alt={item.title}
              width={400}
              height={300}
              className={`w-full h-56 sm:h-48 md:h-52 lg:h-72 object-cover rounded-2xl`}
            />
            <div className="absolute bottom-0 left-0 w-full text-white p-3 flex justify-between items-center">
              <span className="font-heading text-2xl font-medium">{collections?.[2].title}</span>
              <span className="text-xl border rounded-full px-2 py-1">→</span>
            </div>
          </a>
          </div>
          <div className="w-64 flex-1">
            <a
            href={collections?.[3].link}
            className="relative group overflow-hidden rounded-2xl"
          >
            <Image
              src={collections?.[3].image}
              // alt={item.title}
              width={400}
              height={300}
              className={`w-full h-56 sm:h-48 md:h-52 lg:h-72 object-cover rounded-2xl`}
            />
            <div className="absolute bottom-0 left-0 w-full text-white p-3 flex justify-between items-center">
              <span className="font-heading text-2xl font-medium">{collections?.[3].title}</span>
              <span className="text-xl border rounded-full px-2 py-1">→</span>
            </div>
          </a>
          </div>
          <div className="w-64 flex-1">
            <a
            href={collections?.[4].link}
            className="relative group overflow-hidden rounded-2xl"
          >
            <Image
              src={collections?.[4].image}
              // alt={item.title}
              width={400}
              height={300}
              className={`w-full h-56 sm:h-48 md:h-52 lg:h-72 object-cover rounded-2xl`}
            />
            <div className="absolute bottom-0 left-0 w-full text-white p-3 flex justify-between items-center">
              <span className="font-heading text-2xl font-medium">{collections?.[4].title}</span>
              <span className="text-xl border rounded-full px-2 py-1">→</span>
            </div>
          </a>
          </div>
        </div>
      </div>
      {/* {isLoading ?
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
      } */}
    </section>
  );
}
