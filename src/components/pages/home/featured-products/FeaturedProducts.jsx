'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { WISHLIST } from '@/routes';
import Icon from '@/components/general/Icon';
import useProductUtils from '@/utils/hooks/global/useProductUtils';
import { useDispatch, useSelector } from 'react-redux';
import LoginModel from '@/components/model/LoginModel';
import { toast } from 'react-toastify';
import { addToCartService, addToWishListService, deleteWishListService } from '@/app/api/cms/nodeapi/DetailService';
import { loaderData } from '@/redux/slices/loader';
import { wishlist } from '@/redux/slices/wishlist';
import createObjCommanFunction from '@/utils/functions/general/createCartWishlistObje';
import { cart } from '@/redux/slices/cart';


export default function FeaturedProducts(
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
  const [productArray, setProductArray] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const userData = useSelector(data => data.userDataSlice)
  const cartList = useSelector(state => state?.cartReducer ?? []);
  const wishlistData = useSelector(state => state?.wishlistReducer ?? [])
  const [activeTab, setActiveTab] = useState('bestSeller');
  const [bestSeller, setBestSellet] = useState([]);
  const [trending, setTrending] = useState([]);

  const tabChange = (tab) => {

    setActiveTab(tab);
    if (tab == 'bestSeller') {
      setProductArray(bestSeller)
    } else {
      setProductArray(trending)
    }
  }
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
  const fetchProduct = async () => {
    const response = await fetch(
      "https://cms.jiaarajewellery.com/wp-json/wc/v3/products?consumer_key=ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5&consumer_secret=cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6&status=publish&page=1&per_page=20"
    );
    const response2 = await fetch(
      "https://cms.jiaarajewellery.com/wp-json/wc/v3/products?consumer_key=ck_89214419fed8645b0abbdd4d6b6c7f633ec584a5&consumer_secret=cs_99bfc8ad098536727decffbf2a61d33f1e2ac5e6&status=publish&page=2&per_page=20"
    )
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    if (!response2.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const result = await response.json();
    const result2 = await response2.json();
    setBestSellet(result);
    setTrending(result2);
    setProductArray(result);
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
  const itemExistsInWishlist = (id) => {

  }
  const itemExistsInCart = (id) => {

  }
  useEffect(() => {
    fetchProduct()
  }, [])
  return (
    <>

      <section id="featured-products" className="px-[5vw]">
        <div className="flex flex-row items-center justify-center gap-12 my-8 lg:my-14">
          <button onClick={() => tabChange('bestSeller')} className={`font-heading text-center text-3xl lg:text-4xl capetilize text-primaryFont border-b-2 ${activeTab === 'bestSeller' ? 'border-primaryFont' : 'border-transparent'}`}
          >
            Best Seller
          </button>
          <button onClick={() => tabChange('trending')} className={`font-heading text-center text-3xl lg:text-4xl capetilize text-primaryFont border-b-2  ${activeTab === 'trending' ? 'border-primaryFont' : 'border-transparent'}`}
          >Trending</button>
        </div>
        <div className="w-full max-w-[85vw] mx-auto mt-7">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={4}
            autoplay={{ delay: 3000000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1200: { slidesPerView: 4, spaceBetween: 50 },
            }}
          >
            {productArray.map((product, index) => (
              <SwiperSlide index={index} key={product.id}>
                <div className="relative mx-5x">
                  <img
                    src={product?.images[0]?.src}
                    alt={product.title}
                    className="rounded-lg shadow-lg w-full h-[285px] object-cover"
                  />
                  <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex flex-col gap-2">
                    <button onClick={() => checkIsUserLogin('wish', product)} className="bg-primaryBackground p-2 rounded-full shadow-lg flex justify-center items-center h-[40px] w-[40px]">
                      {/* <Icon
                        className={`${icon?.className}`}
                        icon={icon?.active}
                      /> */}
                      <Icon
                        className={`${icon?.className}`}
                        icon={getProductItemFromWishlist(product.id) ? icon?.active : icon?.inactive}
                      />
                    </button>
                    {
                      getProductItemFromCart(product.id) ?
                        <button onClick={() => checkIsUserLogin('cart', product)} className="bg-primaryBackground p-2 rounded-full shadow-lg flex justify-center items-center">
                          <span>&#10004;</span>
                        </button>
                        :
                        <button className="bg-primaryBackground p-2 rounded-full shadow-lg" onClick={() => checkIsUserLogin('cart', product)}>🛒</button>

                    }

                  </div>
                  <h3 className="mt-4 font-heading text-center text-xl tracking-wide">{product.name}</h3>
                  <p className="font-heading text-center text-lg tracking-wide">&#8377;
                    {product.price}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* <Slider className="mt-8">
            {productArray.map((product, index) => (
              <Slide index={index} key={product.id}>
                <div className="relative mx-5">
                  <img
                    src={product?.images[0]?.src}
                    alt={product.title}
                    className="rounded-lg shadow-lg w-full h-[285px] object-cover"
                  />
                  <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex flex-col gap-2">
                    <button className="bg-primaryBackground p-2 rounded-full shadow-lg">❤️
                      <Icon
                        className={`${icon?.className}`}
                        icon={icon?.active}
                      />
                    </button>
                    <button className="bg-primaryBackground p-2 rounded-full shadow-lg" onClick={() => checkIsUserLogin('cart', product)}>🛒</button>
                  </div>
                  <h3 className="mt-4 font-heading text-center text-xl tracking-wide">{product.name}</h3>
                  <p className="font-heading text-center text-lg tracking-wide">&#8377;
                    {product.price}</p>
                </div>
              </Slide>
            ))}
          </Slider> */}
        {/* <div className="flex justify-between mt-6">
          <ButtonBack className="bg-gray-800 text-white p-2 rounded">Back</ButtonBack>
          <ButtonNext className="bg-gray-800 text-white p-2 rounded">Next</ButtonNext>
        </div> */}
      </section>
      <LoginModel isOpen={isModelOpen} closeModel={() => { setIsModelOpen(false); }} />
    </>
  );
}
