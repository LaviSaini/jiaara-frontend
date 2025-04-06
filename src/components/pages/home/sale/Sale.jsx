'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Sale() {
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({}); // Track image index for each product

  // Change images every 2 seconds (auto carousel effect) only for products with multiple images
  useEffect(() => {
    if (currentProducts?.length > 0) {
      const intervals = [];

      currentProducts.forEach((product) => {
        if (product?.images?.length > 1) {
          const interval = setInterval(() => {
            setImageIndexes((prevState) => ({
              ...prevState,
              [product.id]: (prevState[product.id] + 1) % product.images.length,
            }));
          }, 2000);

          // Store the interval ID for cleanup
          intervals.push(interval);
        }
      });

      // Cleanup all intervals when component unmounts or products change
      return () => {
        intervals.forEach(clearInterval);
      };
    }
  }, [currentProducts]); // Only re-run if currentProducts change

  // Fetch categories from API
  const getCategories = async () => {
    try {
      const response = await axios.get("https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories");
      if (response?.status === 200) {
        const firstCategory = response.data[0];
        setCategories(response.data);
        setActiveTab(firstCategory);
        getProducts(firstCategory.id); // Fetch products for the first category
        setIsLoading(false);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      setIsLoading(false);
    }
  };

  // Fetch products for a specific category
  const getProducts = async (categoryId) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`https://cms.jiaarajewellery.com/wp-json/wc/v3/products?category=${categoryId}&consumer_key=ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5&consumer_secret=cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6`);
      if (response?.status === 200) {
        response?.data?.filter(item=>item.on_sale);
        console.log(response.data,"responseDaatat")
        setCurrentProducts(response.data);
        setIsLoading(false)
      } else {
        console.error("Failed to fetch products");
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching products:", error.message);
    }
  };

  // Handle category change
  const tabChange = (tab) => {
    setActiveTab(tab);
    getProducts(tab.id); // Fetch products for the selected category
  };

  // Initial categories load
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section id="sale" className="flex flex-col items-center justify-center gap-7">
      <h2 className="font-heading text-center text-4xl uppercase text-primaryFont leading-10">
        Sale
      </h2>

      {isLoading && <div className="text-center text-gray-500">Loading...</div>}

      {/* Category Tabs */}
      <div className="flex flex-row items-center justify-center gap-12">
        {categories?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => tabChange(tab)}
            className={`font-heading text-center text-2xl capitalize text-primaryFont border-b-2 ${activeTab?.id === tab.id ? 'border-primaryFont' : 'border-transparent'}`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Product Carousel */}
      <div className="w-full max-w-[90vw] mx-auto">
        <Swiper
          key={activeTab?.id} // Force re-render on tab change
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={18}
          slidesPerView={3}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
          }}
        >

          {(currentProducts?.length > 0 && !isLoading) &&
            currentProducts.map((product) => {
              const currentImageIndex = imageIndexes[product.id] || 0; // Use product-specific image index

              return (
                <SwiperSlide key={product.id}>
                  <div className="bg-white shadow-lg relative grid grid-cols-2 rounded-tr-lg rounded-br-lg overflow-hidden">
                    <div className="card-img">
                      <Image
                        src={product?.images[currentImageIndex]?.src} // Fallback image if no images available
                        alt={product?.images[currentImageIndex]?.alt || "default"}
                        width={300}
                        height={200}
                        className="object-cover w-full"
                        priority // Preload images
                      />
                    </div>
                    <div className="content p-4 flex flex-col text-center">
                      <h3 className="text-md font-medium font-content tracking-wide">{product.name}</h3>
                      <h2 className="font-content text-lg font-medium mt-2">{product.price}</h2>
                      <h2>
                        <span className="line-through text-gray-400 text-sm">{product.oldPrice}</span>
                      </h2>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
                        ⭐ {product.rating} <span>{product.reviews}</span>
                      </div>
                      <div className="absolute top-0 left-0 bg-red-600 text-white text-sm font-bold px-2 py-1">
                        {Math.round(((product?.regular_price*1-product?.price*1)/product?.regular_price*1)*100)}%
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
}
