'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import axios from "axios"; // Assuming you are using axios

export default function Collections({ className = "" }) {
  const [collection, setCollection] = useState([]);
  const [isClient, setIsClient] = useState(false); // Flag to track if it's a client-side environment
  const router = useRouter();

  // Extract image URLs from gallery HTML (you might want to modify this part)
  const extractImageUrls = (gallery) => {
    const regex = /<img src="(.*?)"/g;
    const imageUrls = [];
    let match;

    while ((match = regex.exec(gallery)) !== null) {
      imageUrls.push(match[1]);
    }
    return imageUrls;
  };

  const handleNavigation = (id) => {
    if (isClient) { // Ensure the navigation happens only on the client-side
      router.push(`/collection/${id}`);
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await axios.get("https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories?parent=15");
      if (response?.status === 200) {
        const processedData = response?.data.map(item => ({
          ...item,
          gallery: extractImageUrls(item.gallery),
        }));
        setCollection(processedData);
      }
    } catch (error) {
      console.error("Error fetching collections:", error.message);
    }
  };
  // Only run on the client-side after the initial render
  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component is mounted on the client
    fetchCollections();
  }, []);

  return (
    <section id="shop-by-collections" className={`grid items-center  gap-y-6 lg:gap-y-12 ${className}`}>
      <h2 className={`font-heading text-center text-3xl lg:text-4xl capitalize text-primaryFont`}>
        Collections
      </h2>
    
      <div className="w-full px-5 mx-auto sm:px-7 md:px-10 lg:px-16">
        {collection?.map((_, i) => {
          if (i % 2 !== 0) return null; // Only process every two items at once

          const firstItem = collection[i];
          const secondItem = collection[i + 1];
          const isEvenGroup = Math.floor(i / 2) % 2 === 0;

          return (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {isEvenGroup ? (
                // Row 1 style
                <>
                  {/* First Big Block */}
                  <div className="md:col-span-3 flex flex-row h-[50vw] lg:h-[400px]" onClick={()=>handleNavigation(firstItem?.id)}>
                    <div className="bg-collectionBackground p-6 md:p-10 w-full md:w-1/3 flex items-center justify-center">
                      <h1 className="text-primaryFont text-2xl md:text-3xl font-light text-center leading-snug">
                        {firstItem?.name}
                      </h1>
                    </div>
                    <div className="w-full md:w-2/3 h-full overflow-hidden md:overflow-auto">
                      <img
                        src={firstItem?.gallery[0]}
                        alt="Center Image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Second Small Block */}
                  {secondItem && (
                    <div className="md:col-span-1 h-[50vw] lg:h-[400px]" onClick={()=>handleNavigation(secondItem?.id)}>
                      <div className="bg-collectionBackground h-full flex flex-col">
                        <h1 className="text-primaryFont text-xl md:text-2xl font-light text-center pt-6 px-4">
                          {secondItem?.name}
                        </h1>
                        <div className="flex-grow px-4 pt-4 overflow-hidden">
                          <img
                            src={secondItem?.gallery[0]}
                            alt="Bottom Image"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // Row 2 style
                <>
                  {/* First Small Block */}
                  <div className="md:col-span-1 h-[50vw] lg:h-[400px] order-3 md:order-none" onClick={()=>handleNavigation(firstItem?.id)}>
                    <div className="bg-collectionBackground h-full flex flex-col">
                      <h1 className="text-primaryFont text-xl md:text-2xl font-light text-center pt-6 px-4">
                        {firstItem?.name}
                      </h1>
                      <div className="flex-grow px-4 pt-4 overflow-hidden">
                        <img
                          src={firstItem?.gallery[0]}
                          alt="Bottom Image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Second Big Block */}
                  {secondItem && (
                    <div className="md:col-span-3 flex flex-row h-[50vw] lg:h-[400px] order-4 md:order-none" onClick={()=>handleNavigation(secondItem?.id)}>
                      <div className="bg-collectionBackground p-6 md:p-10 w-full md:w-1/3 flex items-center justify-center">
                        <h1 className="text-primaryFont text-2xl md:text-3xl font-light text-center leading-snug">
                          {secondItem?.name}
                        </h1>
                      </div>
                      <div className="w-full md:w-2/3 h-full overflow-hidden md:overflow-auto">
                        <img
                          src={secondItem?.gallery[0]}
                          alt="Center Image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

      </div>
    </section>
  );
}
