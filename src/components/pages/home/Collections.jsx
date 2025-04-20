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

<<<<<<< HEAD
  // Only run on the client-side after the initial render
  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component is mounted on the client
    fetchCollections();
  }, []);
=======
<<<<<<< Updated upstream
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
>>>>>>> fda61b386e422575ff40369f0ed0d948c0ba3cf4

=======
  // Only run on the client-side after the initial render
  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component is mounted on the client
    fetchCollections();
  }, []);
  console.log(collection, "collection")
>>>>>>> Stashed changes
  return (
    <section id="shop-by-collections" className={`grid items-center gap-y-12 ${className}`}>
      <h2 className={`font-heading text-center text-4xl capitalize text-primaryFont`}>
        Collections
      </h2>
<<<<<<< Updated upstream
      <div className="w-full px-5 mx-auto sm:px-7 md:px-10 lg:px-16">
        {collection?.map((item, index) => (
          <div key={item.id} className="flex gap-5 mb-4">
            {/* Second Collection Box (for even indices) */}
            {index % 2 === 0 && (
              <div className="flex flex-col lg:flex-row gap-5">
                {/* Text Box */}
                <div className="flex-1 bg-collectionBackground rounded-2xl p-8 flex flex-col justify-between order-2 lg:order-1">
                  <div>
                    <h2 className="text-3xl font-semibold text-primaryFont mb-4">{item?.name}</h2>
                    <p className="text-primaryFont mb-3 font-content text-sm leading-6 tracking-wide">
                      Discover the charm of timeless elegance with our exclusive Clover Jewelry Collection. Inspired by
                      the symbol of luck, love, and prosperity, each piece in this collection captures the delicate beauty
                      of the clover leaf, reimagined in stunning designs that resonate with grace and sophistication.
                      Whether you&apos;re drawn to the enchanting allure of nature or the promise of good fortune, our Clover
                      Jewelry Line offers a perfect blend of style and sentiment. Adorn yourself with the elegance of
                      clover-inspired artistry, and let your luck shine through every piece.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="border-2 border-primaryFont text-primaryFont font-medium py-2 px-4 rounded-full arrowDiv"
                      onClick={() => handleNavigation(item?.id)}
                    >
                      <span className="text-xl">→</span>
                    </button>
                  </div>
                </div>

                {/* Image Section */}
                <div className="flex-1 flex flex-row gap-5 order-1 lg:order-2">
                  {/* Image 1 */}
                  <div className="flex-1 rounded-2xl overflow-hidden">
                    <a href={`/collection/${item?.id}`} className="block h-full">
                      <Image
                        src={item?.gallery[0]}
                        className="w-full h-full object-cover rounded-2xl"
                        width={400}
                        height={300}
                        alt={item?.title}
                      />
                    </a>
                  </div>

                  {/* Image 2 */}
                  <div className="flex-1 rounded-2xl overflow-hidden">
                    <a href={`/collection/${item?.id}`} className="block h-full">
                      <Image
                        src={item?.gallery[1]}
                        className="w-full h-full object-cover rounded-2xl"
                        width={400}
                        height={300}
                        alt={item?.title}
                      />
                    </a>
                  </div>
                </div>
              </div>


            )}

            {/* For odd indices (non-even indices) */}
            {index % 2 !== 0 && (
              <div className="flex flex-col sm:flex-row gap-5 items-stretch ">
                {/* First Image Box */}
                <div className="flex-1 rounded-2xl overflow-hidden max-h-[340px]">
                  <a href={`/collection/${item?.id}`} className="block h-full">
                    <Image
                      src={item?.gallery[0]}
                      className="w-full h-full object-cover rounded-2xl"
                      width={400}
                      height={300}
                      alt={item?.title}
                    />
                  </a>
                </div>

                {/* Description Box */}
                <div className="flex-1 bg-collectionBackground rounded-2xl p-8 flex flex-col justify-between max-h-[340px]">
                  <div>
                    <h2 className="text-3xl font-semibold text-primaryFont mb-4">{item?.name}</h2>
                    <p className="text-primaryFont mb-3 font-content text-sm leading-6 tracking-wide">
                      Introducing the Harmony Collection. Our bead jewelry line is crafted with meticulous attention to detail,
                      blending colors, textures, and materials to create pieces that resonate with balance and unity.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="border-2 border-primaryFont text-primaryFont font-medium py-2 px-4 rounded-full arrowDiv"
                      onClick={() => handleNavigation(item?.id)}
                    >
                      <span className="text-xl">→</span>
                    </button>
                  </div>
                </div>
              </div>

            )}
          </div>
<<<<<<< HEAD
        ))}
=======
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
            <div className="flex justify-end md:justify-end">
              <button className="border-2 border-primaryFont  text-primaryFont font-medium py-2 px-2 rounded-full">
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-[20%] flex-none bg-collectionBackground rounded-2xl px-8  pt-[50px]">
            <h2 className="text-3xl font-semibold text-primaryFont mb-4">{collections?.[0].title}</h2>
            <p className="text-primaryFont mb-3 font-content text-sm leading-6 tracking-wide">
              Introducing the Harmony Collection. Our bead jewelry line is crafted with meticulous attention to detail, blending colors, textures, and materials to create pieces that resonate with balance and unity.
            </p>
            <div className="flex justify-end md:justify-end">
              <button className="border-2 border-primaryFont  text-primaryFont font-medium py-2 px-2 rounded-full">
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>
          <div class="flex-1 w-[40%] h-[330px]">
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
          <div class="flex-1 w-[40%] h-[330px]">
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
        </div>
=======
      {/* <div className="w-full px-5 mx-auto sm:px-7 md:px-10 lg:px-16">
        {collection?.map((item, index) => (
          <div key={item.id} className="flex gap-5 mb-4">
            {index % 2 === 0 && (
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex-1 bg-collectionBackground rounded-2xl p-8 flex flex-col justify-between order-2 lg:order-1">
                  <div>
                    <h2 className="text-3xl font-semibold text-primaryFont mb-4">{item?.name}</h2>
                    <p className="text-primaryFont mb-3 font-content text-sm leading-6 tracking-wide">
                      Discover the charm of timeless elegance with our exclusive Clover Jewelry Collection. Inspired by
                      the symbol of luck, love, and prosperity, each piece in this collection captures the delicate beauty
                      of the clover leaf, reimagined in stunning designs that resonate with grace and sophistication.
                      Whether you&apos;re drawn to the enchanting allure of nature or the promise of good fortune, our Clover
                      Jewelry Line offers a perfect blend of style and sentiment. Adorn yourself with the elegance of
                      clover-inspired artistry, and let your luck shine through every piece.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="border-2 border-primaryFont text-primaryFont font-medium py-2 px-4 rounded-full arrowDiv"
                      onClick={() => handleNavigation(item?.id)}
                    >
                      <span className="text-xl">→</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex flex-row gap-5 order-1 lg:order-2">
             
                  <div className="flex-1 rounded-2xl overflow-hidden">
                    <a href={`/collection/${item?.id}`} className="block h-full">
                      <Image
                        src={item?.gallery[0]}
                        className="w-full h-full object-cover rounded-2xl"
                        width={400}
                        height={300}
                        alt={item?.title}
                      />
                    </a>
                  </div>

                  <div className="flex-1 rounded-2xl overflow-hidden">
                    <a href={`/collection/${item?.id}`} className="block h-full">
                      <Image
                        src={item?.gallery[1]}
                        className="w-full h-full object-cover rounded-2xl"
                        width={400}
                        height={300}
                        alt={item?.title}
                      />
                    </a>
                  </div>
                </div>
              </div>


            )}

            {index % 2 !== 0 && (
              <div className="flex flex-col sm:flex-row gap-5 items-stretch ">
                <div className="flex-1 rounded-2xl overflow-hidden max-h-[340px]">
                  <a href={`/collection/${item?.id}`} className="block h-full">
                    <Image
                      src={item?.gallery[0]}
                      className="w-full h-full object-cover rounded-2xl"
                      width={400}
                      height={300}
                      alt={item?.title}
                    />
                  </a>
                </div>
                <div className="flex-1 bg-collectionBackground rounded-2xl p-8 flex flex-col justify-between max-h-[340px]">
                  <div>
                    <h2 className="text-3xl font-semibold text-primaryFont mb-4">{item?.name}</h2>
                    <p className="text-primaryFont mb-3 font-content text-sm leading-6 tracking-wide">
                      Introducing the Harmony Collection. Our bead jewelry line is crafted with meticulous attention to detail,
                      blending colors, textures, and materials to create pieces that resonate with balance and unity.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="border-2 border-primaryFont text-primaryFont font-medium py-2 px-4 rounded-full arrowDiv"
                      onClick={() => handleNavigation(item?.id)}
                    >
                      <span className="text-xl">→</span>
                    </button>
                  </div>
                </div>
              </div>

            )}
          </div>
        ))}
      </div> */}
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
                  <div className="md:col-span-3 flex flex-col md:flex-row h-[400px]">
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
                    <div className="md:col-span-1 h-[400px]">
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
                  <div className="md:col-span-1 h-[400px] order-3 md:order-none">
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
                    <div className="md:col-span-3 flex flex-col md:flex-row h-[400px] order-4 md:order-none">
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

>>>>>>> Stashed changes
>>>>>>> fda61b386e422575ff40369f0ed0d948c0ba3cf4
      </div>
    </section>
  );
}
