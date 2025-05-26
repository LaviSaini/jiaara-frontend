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
    <section id="shop-by-collections" className={`grid items-center ${className}`}>
      <h2 className={`font-heading text-center text-3xl lg:text-4xl capitalize text-primaryFont my-8 lg:my-10`}>
        Collections
      </h2>

      <div className="w-full px-5 mx-auto sm:px-7 md:px-10 lg:px-[104px] hidden lg:flex lg:flex-col">
        {collection?.map((_, i) => {
          if (i % 2 !== 0) return null; // Only process every 2 items

          const firstItem = collection[i];
          const secondItem = collection[i + 1];
          const isEvenGroup = Math.floor(i / 2) % 2 === 0;

          return (
            <div key={i} className="ct-div-block gap-4 mb-3">
              {isEvenGroup ? (
                <>
                  {/* First Big Block */}
                  <div
                    className="bg-collectionBackground p-6 md:p-10 w-full md:w-[102%] flex items-center justify-center h-[50vw] lg:h-[24vw] lg:mx-h-[426px]"
                    onClick={() => handleNavigation(firstItem?.id)}
                  >
                    <h1 className="text-primaryFont text-2xl md:text-3xl lg:text-4xl font-medium text-center leading-snug">
                      {firstItem?.name}
                    </h1>
                  </div>
                  <div
                    className="w-full md:w-[101%] overflow-hidden md:overflow-auto h-[50vw] lg:h-[24vw] lg:mx-h-[426px]"
                    onClick={() => handleNavigation(firstItem?.id)}
                  >
                    <img
                      src={firstItem?.gallery[0]}
                      alt="First Image"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Second Small Block (Only if exists) */}
                  {secondItem && (
                    <div
                      className="h-[50vw] lg:h-[24vw] lg:mx-h-[426px] ms-0 lg:ms-4"
                      onClick={() => handleNavigation(secondItem?.id)}
                    >
                      <div className="bg-collectionBackground h-full flex flex-col">
                        <h1 className="text-primaryFont text-xl md:text-2xl lg:text-3xl font-medium text-center pt-6 px-4">
                          {secondItem?.name}
                        </h1>
                        <div className="flex-grow px-4 lg:px-16 pt-4 overflow-hidden">
                          <img
                            src={secondItem?.gallery[0]}
                            alt="Second Image"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                </>
              ) : (
                <>
                  {/* Alternate layout for odd-indexed rows */}
                  <div
                    className="h-[50vw] lg:h-[24vw] lg:mx-h-[426px] me-4"
                    onClick={() => handleNavigation(firstItem?.id)}
                  >
                    <div className="bg-collectionBackground h-full flex flex-col">
                      <h1 className="text-primaryFont text-xl md:text-2xl lg:text-3xl font-medium text-center pt-6 px-4">
                        {firstItem?.name}
                      </h1>
                      <div className="flex-grow px-4 lg:px-16 pt-4 overflow-hidden">
                        <img
                          src={firstItem?.gallery[0]}
                          alt="First Image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {secondItem && (
                    <>
                      <div
                        className="bg-collectionBackground p-6 md:p-10 w-full md:w-[102%] flex items-center justify-center h-[50vw] lg:h-[24vw] lg:mx-h-[426px]"
                        onClick={() => handleNavigation(secondItem?.id)}
                      >
                        <h1 className="text-primaryFont text-2xl md:text-3xl lg:text-4xl font-medium text-center leading-snug">
                          {secondItem?.name}
                        </h1>
                      </div >
                      <div
                        className="w-full md:w-[100%] overflow-hidden md:overflow-auto h-[50vw] lg:h-[24vw] lg:mx-h-[426px]"
                        onClick={() => handleNavigation(secondItem?.id)}
                      >
                        <img
                          src={secondItem?.gallery[0]}
                          alt="Second Image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full px-5 mx-auto sm:px-7 md:px-10 lg:px-20 flex flex-col lg:hidden">
  {collection?.map((item, i) => {
    // Big block at every 3rd item
    if (i % 3 === 0) {
      return (
        <div key={i} className="ct-div-block gap-3 mb-4">
          <div
            className="bg-collectionBackground p-6 md:p-10 w-full flex items-center justify-center h-[50vw]"
            onClick={() => handleNavigation(item?.id)}
          >
            <h1 className="text-primaryFont text-2xl md:text-3xl font-medium text-center leading-snug">
              {item?.name}
            </h1>
          </div>
          <div
            className="w-full overflow-hidden h-[50vw]"
            onClick={() => handleNavigation(item?.id)}
          >
            <img
              src={item?.gallery[0]}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }

    // Two small blocks in a single row
    if (i % 3 === 1) {
      const firstSmall = collection[i];
      const secondSmall = collection[i + 1]; // May be undefined at end of array

      return (
        <div key={i} className="flex gap-3 mb-4">
          {/* First Small Block */}
          <div
            className="w-1/2 h-[50vw]"
            onClick={() => handleNavigation(firstSmall?.id)}
          >
            <div className="bg-collectionBackground h-full flex flex-col">
              <h1 className="text-primaryFont text-xl font-medium text-center pt-6 px-4">
                {firstSmall?.name}
              </h1>
              <div className="flex-grow px-4 pt-4 overflow-hidden">
                <img
                  src={firstSmall?.gallery[0]}
                  alt={firstSmall?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Second Small Block */}
          {secondSmall && (
            <div
              className="w-1/2 h-[50vw]"
              onClick={() => handleNavigation(secondSmall?.id)}
            >
              <div className="bg-collectionBackground h-full flex flex-col">
                <h1 className="text-primaryFont text-xl font-medium text-center pt-6 px-4">
                  {secondSmall?.name}
                </h1>
                <div className="flex-grow px-4 pt-4 overflow-hidden">
                  <img
                    src={secondSmall?.gallery[0]}
                    alt={secondSmall?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Skip item if it's already rendered in small pair above
    return null;
  })}
</div>

    </section>
  );
}
