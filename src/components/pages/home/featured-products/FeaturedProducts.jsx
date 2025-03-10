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
import { useSelector } from 'react-redux';
import LoginModel from '@/components/model/LoginModel';
import { toast } from 'react-toastify';
import { addToCartService } from '@/app/api/cms/nodeapi/DetailService';

const products = {
  bestSeller: [
    { id: 1, title: 'Etch Chain Bracelet', price: '₹ 9,200.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FNecklaces.webp&w=1920&q=75' },
    { id: 2, title: 'Heart Pearl Hoops', price: '₹ 6,300.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FEarrings.webp&w=1920&q=75' },
    { id: 3, title: 'Etch Chain Bracelet', price: '₹ 9,200.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FJhumkas.webp&w=1920&q=75' },
    { id: 4, title: 'Heart Pearl Hoops', price: '₹ 6,300.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FJhumkas.webp&w=1920&q=75' },
    { id: 5, title: 'Etch Chain Bracelet', price: '₹ 9,200.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FNecklaces.webp&w=1920&q=75' },
    { id: 6, title: 'Heart Pearl Hoops', price: '₹ 6,300.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FEarrings.webp&w=1920&q=75' },
  ],
  trending: [
    { id: 7, title: 'Danbury Ring', price: '₹ 7,500.00', image: '/images/ring.jpg' },
    { id: 8, title: 'Sahara Pearl Anklet', price: '₹ 5,200.00', image: '/images/anklet.jpg' },
    { id: 9, title: 'Sahara Pearl Anklet', price: '₹ 5,200.00', image: '/images/anklet.jpg' },
    { id: 10, title: 'Sahara Pearl Anklet', price: '₹ 5,200.00', image: '/images/anklet.jpg' },
    { id: 11, title: 'Sahara Pearl Anklet', price: '₹ 5,200.00', image: '/images/anklet.jpg' },
  ]
};
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
  const [productArray, setProductArray] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const userData = useSelector(data => data.userDataSlice)
  const cartList = useSelector(state => state?.cartReducer ?? []);
  const wishlist = useSelector(state => state?.wishlistReducer ?? [])
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
    console.log('Result', result)
    setBestSellet(result);
    setTrending(result2);
    setProductArray(result);
  }
  const checkIsUserLogin = (type, product) => {
    if (!userData) {
      toast('login required', { type: 'error' })
      setIsModelOpen(true)
      return;
    }
    if (type == 'cart') {
      addItemToCart(1, 'new', product)
    }
    //  else if (type == 'wishlist') {
    //   if (wishlistItem) {
    //     deleteWishList(wishlistItem?.product_id)
    //   } else {
    //     addItemToWishList()

    //   }
    // }
  }
  const addItemToCart = async (isRemove, isOld, item) => {
    console.log(item)
    const requestObject = {
      userId: userData?.userId,
      productId: item?.id,
      quantity: isRemove ? -1 : 1,
      img: item?.images[0]?.src,
      name: item?.name,
      price: item?.price
    }
    console.log(requestObject)
    const response = await addToCartService(requestObject);
    if (response?.response?.success) {
      if (type == 'new') {
        addToCart()
      } else if (type == 'update') {
        if (quantity == 1) {
          dispatch(cart.incrementQty({ productId: product?.id, quantity: cartItem[0]?.quantity + quantity }));
        } else {
          dispatch(cart.decrementQty({ productId: product?.id, quantity: cartItem[0]?.quantity + quantity }));
        }
      }
    } else {
      toast('Something Went Wrong!', { type: 'error' })
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
        <div className="flex flex-row items-center justify-center gap-12">
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
      autoplay={{ delay: 3000, disableOnInteraction: false }}
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
