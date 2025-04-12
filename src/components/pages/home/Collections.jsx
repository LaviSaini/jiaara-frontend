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
        <div className="flex gap-5 mb-4">
          <div className="flex-none w-[40%] h-[330px]">
            <a
              href={collections?.[0].link}
              className="overflow-hidden rounded-2xl w-full"
            >
              <Image
                src={collections?.[0].image}
                className="w-full h-full object-cover rounded-2xl"
                width={400}
                height={300}
              />
            </a>
          </div>
          <div className="flex-auto bg-collectionBackground rounded-2xl px-8 pt-[50px]">
            <h2 className="text-3xl font-semibold text-primaryFont mb-4">{collections?.[0].title}</h2>
            <p className="text-primaryFont mb-3 font-content text-sm leading-6 tracking-wide">
              Discover the charm of timeless elegance with our exclusive Clover Jewelry Collection. Inspired by
              the symbol of luck, love, and prosperity, each piece in this collection captures the delicate beauty
              of the clover leaf, reimagined in stunning designs that resonate with grace and sophistication.
              Whether you're drawn to the enchanting allure of nature or the promise of good fortune, our Clover
              Jewelry Line offers a perfect blend of style and sentiment. Adorn yourself with the elegance of
              clover-inspired artistry, and let your luck shine through every piece.
            </p>
            <div className="flex justify-end md:justify-end arrowDiv">
              <button className="border-2 border-primaryFont  text-primaryFont font-medium py-2 px-2 rounded-full">
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-5">
          {/* First div - full width on all screen sizes */}
          <div className="w-full md:w-[20%] flex-auto bg-collectionBackground rounded-2xl px-8 pt-[50px]">
            <h2 className="text-3xl font-semibold text-primaryFont mb-4">{collections?.[0].title}</h2>
            <p className="text-primaryFont mb-3 font-content text-sm leading-6 tracking-wide">
              Introducing the Harmony Collection. Our bead jewelry line is crafted with meticulous attention to detail, blending colors, textures, and materials to create pieces that resonate with balance and unity.
            </p>
            <div className="flex justify-end arrowDiv">
              <button className="border-2 border-primaryFont text-primaryFont font-medium py-2 px-2 rounded-full">
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>

          {/* Container for second and third divs */}
          <div className="flex gap-5">
            {/* Second div */}
            <div className="flex-1 w-[50%] h-[330px]">
              <a href={collections?.[0].link} className="overflow-hidden rounded-2xl w-full block">
                <Image
                  src={collections?.[0].image}
                  className="w-full h-full object-cover rounded-2xl"
                  width={400}
                  height={300}
                />
              </a>
            </div>

            {/* Third div */}
            <div className="flex-1 w-[50%] h-[330px]">
              <a href={collections?.[0].link} className="overflow-hidden rounded-2xl w-full block">
                <Image
                  src={collections?.[0].image}
                  className="w-full h-full object-cover rounded-2xl"
                  width={400}
                  height={300}
                />
              </a>
            </div>
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
