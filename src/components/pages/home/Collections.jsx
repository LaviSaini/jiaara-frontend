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
    <section id="shop-by-collections" className={`grid items-center gap-y-12 ${className}`}>
      <h2 className={`font-heading text-center text-4xl capitalize text-primaryFont`}>
        Collections
      </h2>
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
        ))}
      </div>
    </section>
  );
}
