'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { WISHLIST } from '@/routes';
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Icon from '@/components/general/Icon';
import { useDispatch, useSelector } from 'react-redux';
import LoginModel from '@/components/model/LoginModel';
import { loaderData } from '@/redux/slices/loader';
import { addToCartService, addToWishListService, deleteWishListService } from '@/app/api/cms/nodeapi/DetailService';
import createObjCommanFunction from '@/utils/functions/general/createCartWishlistObje';
import { wishlist } from '@/redux/slices/wishlist';
import { cart } from '@/redux/slices/cart';
import { toast } from 'react-toastify';

export default function Sale(
  {
    icon = {
      className: "text-primaryFont",
      active: WISHLIST?.activeIcon,
      inactive: WISHLIST?.inactiveIcon,
      general: <></>
    }
  }
) {
  const dispatch = useDispatch();

  const userData = useSelector(data => data.userDataSlice)
  const [isModelOpen, setIsModelOpen] = useState(false);
  const cartList = useSelector(state => state?.cartReducer ?? []);
  const wishlistData = useSelector(state => state?.wishlistReducer ?? [])
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({}); // Track image index for each product
  const categoryList = useSelector(data => data.categorySlice)

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
    // try {
    //   const response = await axios.get("https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories");
    //   if (response?.status === 200) {
    //     const result = response.data?.filter(item => item.id != 15);
    //     const firstCategory = result[0]
    //     // console.log(result, "firstCategory")
    //     setCategories(result);
    //     setActiveTab(firstCategory.id);
    //     getProducts(firstCategory.id); // Fetch products for the first category
    //     setIsLoading(false);
    //   } else {
    //     console.error("Failed to fetch categories");
    //   }
    // } catch (error) {
    //   console.error("Error fetching categories:", error.message);
    //   setIsLoading(false);
    // }
    const result = categoryList?.filter(item => item.id != 15);
    const firstCategory = result[0];
    setCategories(result);
    setActiveTab(firstCategory.id);
    getProducts(firstCategory.id);
    setIsLoading(false)
  };
  function getCat(id) {
    const data = categories.find(data => data.id == id);
    return data;
  }
  // Fetch products for a specific category
  const getProducts = async (categoryId) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`https://cms.jiaarajewellery.com/wp-json/wc/v3/products?category=${categoryId}&consumer_key=ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5&consumer_secret=cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6`);
      if (response?.status === 200) {
        let arr = [];
        const keys = Object.keys(response?.data).slice(0, Object.keys(response?.data).length - 1);
        keys.forEach((element) => {
          arr.push(response?.data[element])
        })
        const list = arr?.filter(item => item.on_sale);
        setCurrentProducts(list);
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
    getProducts(tab); // Fetch products for the selected category
  };
  function getProductItemFromWishlist(productId) {
    const data = wishlistData.find(data => data.product_id == productId);
    if (data) {
      return true;
    } else {
      return false;
    }
  }
  function getProductItemFromCart(productId) {
    const data = cartList.find(data => data.product_id == productId);
    if (data) {
      return true;
    } else {
      return false;
    }
  }
  const checkIsUserLogin = (type, product) => {
    if (!userData) {
      setIsModelOpen(true)
      return;
    }
    if (type == 'wish') {
      if (getProductItemFromWishlist(product.id)) {
        //delete from wishlist
        deleteWishList(product.id)
      } else {
        addItemToWishList(product)
      }
    } else {
      if (getProductItemFromCart(product.id)) {
        toast("Item already added to cart!", { type: 'success' })
        return;
      }
      addItemToCart(product);
    }
  }
  const deleteWishList = async (productId) => {
    try {
      dispatch(loaderData.add(true));
      const response = await deleteWishListService(userData?.userId, productId);
      if (response?.response?.success) {
        dispatch(wishlist.remove(productId))
      }
    } catch (error) {
      dispatch(loaderData.clear())
    }
    dispatch(loaderData.add(false));
  }
  const addItemToWishList = async (product) => {
    const requestObject = {
      userId: userData?.userId,
      productId: product?.id,
      data: JSON.stringify(product)
    }
    // setIsLoading(true)
    dispatch(loaderData.add(true));
    try {
      const response = await addToWishListService(requestObject);
      if (response?.response?.success) {
        dispatch(wishlist.add(createObjCommanFunction(product)))
      } else {
        toast('Something Went Wrong!', { type: 'error' })
      }
      dispatch(loaderData.add(false));
    } catch (error) {
      dispatch(loaderData.clear())
    }
    // setIsLoading(false)

  }
  const addItemToCart = async (product) => {
    const requestObject = {
      userId: userData?.userId,
      productId: product?.id,
      quantity: 1,
      img: product?.images[0]?.src,
      name: product?.name,
      price: product?.price
    }
    try {
      dispatch(loaderData.add(true))
      const response = await addToCartService(requestObject);
      if (response?.response?.success) {
        toast("Item added to Cart!", { type: 'success' });
        const obj = createObjCommanFunction(product);
        dispatch(cart.addAll([...cartList, { ...obj, quantity: 1 }]))
        dispatch(loaderData.clear());

      } else {
        toast('Something Went Wrong!', { type: 'error' })
      }
      dispatch(loaderData.clear())
    } catch (error) {
      toast("Something Went Wrong!", { type: 'error' })
      dispatch(loaderData.add(false));
    }

  }
  // Initial categories load
  useEffect(() => {
    getCategories();
  }, [categoryList]);

  return (
    <section id="sale" className="flex flex-col items-center justify-center gap-7">
      <h2 className="font-heading text-center text-4xl uppercase text-primaryFont leading-10">
        Sale
      </h2>


      {/* Category Tabs */}
      <div className="overflow-x-auto w-full scrollbar-width salestablist">
        <div className="flex flex-row items-center gap-12 whitespace-nowrap px-4 saleCategories">
          {categories?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => tabChange(tab.id)}
              className={`font-heading text-center text-2xl capitalize text-primaryFont border-b-2 ${activeTab == tab.id ? 'border-primaryFont' : 'border-transparent'
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      <div className='salestabselect  justify-end mr-[63px] w-[100%]' >
        {/* <div>
          <span>Category: </span>
          <span>{getCat(activeTab)?.name}</span>
        </div> */}
        <div>

          <select name="" id="" className='globalSelect' value={activeTab} onChange={e => tabChange(e.target.value)}>
            {
              categories?.map((tab) => {
                return (
                  <>
                    <option key={tab.id} value={tab.id}>{tab.name}</option>
                  </>
                )
              })
            }
          </select>
        </div>

      </div>

      {isLoading && <div className="text-center text-gray-500 h-[135px]">Loading...</div>}

      {/* Product Carousel */}
      {
        currentProducts?.length == 0 ?

          !isLoading ? <div className="text-center text-gray-500 h-[135px]">No Product Found!</div> : ''

          :
          <div className="w-full max-w-[90vw] mx-auto saleSLider">
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
                  // console.log(product)
                  return (
                    <SwiperSlide key={product.id}>
                      <div className="bg-white shadow-lg relative grid grid-cols-2 rounded-tr-lg rounded-br-lg overflow-hidden">
                        <div className="card-img h-[180px] w-full" >
                          <Image
                            src={product?.images[currentImageIndex]?.src} // Fallback image if no images available
                            alt={product?.images[currentImageIndex]?.alt || "default"}
                            width={300}
                            height={200}
                            className="object-cover w-[100%] h-[100%] "
                            priority // Preload images
                          />
                        </div>
                        <div className="content p-4 flex flex-col text-left justify-between">
                          <div className="absolute top-0 left-0 bg-red-600 text-white text-sm font-bold px-2 py-1">
                            {Math.round(((product?.regular_price * 1 - product?.price * 1) / product?.regular_price * 1) * 100)}%
                          </div>
                          <div className='flex flex-col'>
                            <h3 className="text-xs font-medium font-content tracking-wide">{product.name}</h3>
                            <h2 className="font-content text-lg font-medium mt-2">₹ {product.price.toLocaleString()}</h2>
                            <h2>
                              <span className="relative inline-block text-gray-500 old-price">₹ {product.regular_price.toLocaleString()}</span>
                            </h2>
                          </div>
                          {/* <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
                            ⭐ {product.rating} <span>{product.reviews}</span>
                          </div> */}
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className='bg-collectionBackground rounded-full px-2 py-1 text-xs w-[35px] h-[35px] flex justify-center items-center' onClick={() => checkIsUserLogin('wish', product)}>
                              <Icon
                                className={`${icon?.className} h-[15px] w-[15px]`}
                                icon={getProductItemFromWishlist(product.id) ? icon?.active : icon?.inactive}
                              // icon={getProductItemFromWishlist(product.id) ? icon?.active : icon?.inactive}
                              />
                            </span>
                            {getProductItemFromCart(product.id) ?
                              <button onClick={() => checkIsUserLogin('cart', product)} className="bg-primaryBackground p-2 rounded-full shadow-lg flex justify-center items-center">
                                <span>&#10004;</span>
                              </button>
                              :
                              <button onClick={() => checkIsUserLogin('cart', product)} className="bg-primaryBackground p-2 rounded-full shadow-lg" >🛒</button>}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
      }
      <LoginModel isOpen={isModelOpen} closeModel={() => { setIsModelOpen(false); }} />

    </section>
  );
}
