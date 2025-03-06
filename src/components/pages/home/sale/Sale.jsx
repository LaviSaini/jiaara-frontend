"use client";

import Image from 'next/image';
// import { useState, useEffect } from "react";
// import Axios from "axios";

// import ProductsCarousel from "@/components/global/ProductsCarousel";
// import SaleProductCard from "./components/SaleProductCard";
// import UserProductsStatus from "@/components/global/UserProductsStatus";
// import Validation from "@/components/general/Validation";

// import { CATEGORIES } from "@/routes";
// import splitInHalf from "@/utils/functions/general/splitInHalf";

// const CategoriesTabs = UserProductsStatus;


const products = [
  {
    id: 1,
    name: 'Twist Flows Bracelet',
    price: '₹ 6,200.00',
    oldPrice: '₹ 8,400.00',
    discount: '18% Off',
    rating: '4.4',
    reviews: '5 REVIEWS',
    image: 'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp'
  },
  {
    id: 2,
    name: '18ct Yellow Gold GG',
    price: '₹ 52,000.00',
    oldPrice: '₹ 55,000.00',
    discount: '5% Off',
    rating: '4.4',
    reviews: '5 REVIEWS',
    image: 'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp'
  },
  {
    id: 3,
    name: '18ct White Gold 2cttw',
    price: '₹ 58,400.00',
    oldPrice: '₹ 75,200.00',
    discount: '28% Off',
    rating: '4.4',
    reviews: '5 REVIEWS',
    image: 'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp'
  }
];


export default function Sale() {
  // const [categoryId, setCategoryId] = useState(null);
  // const [parentCategories, setParentCategories] = useState([]); // Default empty array
  // const [isParentCategoriesLoading, setIsParentCategoriesLoading] = useState(true);
  // const [isParentCategoriesFetched, setIsParentCategoriesFetched] = useState(false);

  // const [saleProducts, setSaleProducts] = useState([]);
  // const [isSaleProductsLoading, setIsSaleProductsLoading] = useState(false);
  // const [isSaleProductsFetched, setIsSaleProductsFetched] = useState(false);

  // // Fetch Categories Directly
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await Axios.get(
  //         "https://cms.jiaarajewellery.com/wp-json/cms/woocommerce/categories/getCategories?page=1&per_page=5&parent=0"
  //       );

  //       if (!Array.isArray(response.data)) {
  //         throw new Error("Invalid response format");
  //       }

  //       setParentCategories(response.data);
  //       setIsParentCategoriesFetched(true);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //       setParentCategories([]); // Ensure default empty array to prevent issues
  //       setIsParentCategoriesFetched(false);
  //     } finally {
  //       setIsParentCategoriesLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  // // Fetch Sale Products when categoryId changes
  // useEffect(() => {
  //   if (!categoryId) return;

  //   const fetchSaleProducts = async () => {
  //     setIsSaleProductsLoading(true);
  //     try {
  //       const response = await Axios.get(
  //         `https://cms.jiaarajewellery.com/wp-json/cms/woocommerce/products/getProducts?page=1&per_page=100&categoryId=${categoryId}&onSale=true&status=publish`
  //       );

  //       if (!Array.isArray(response.data.products)) {
  //         throw new Error("Invalid response format for products");
  //       }

  //       setSaleProducts(response.data.products);
  //       setIsSaleProductsFetched(true);
  //     } catch (error) {
  //       console.error("Error fetching sale products:", error);
  //       setSaleProducts([]);
  //       setIsSaleProductsFetched(false);
  //     } finally {
  //       setIsSaleProductsLoading(false);
  //     }
  //   };

  //   fetchSaleProducts();
  // }, [categoryId]);

  // const requiredCategories = (categories) => {
  //   if (!Array.isArray(categories)) return [];
  //   return categories.filter((category) => category?.name !== "General");
  // };

  // const getActiveCategoryId = (activeCategoryId) => setCategoryId(activeCategoryId);

  // const [upperSaleProductsArr, lowerSaleProductsArr] =
  //   isSaleProductsFetched && splitInHalf(saleProducts) || [];

  // const createNewObj = (data) => ({
  //   user_id: "",
  //   cart_id: "",
  //   created_date: "",
  //   product_id: data?.id,
  //   quantity: 0,
  //   img: data?.image,
  //   price: data?.price,
  //   name: data?.name,
  //   status: "s",
  // });

  // const productList = saleProducts.map(createNewObj);

  // if (isParentCategoriesLoading) {
  //   return (
  //     <Validation className="w-full h-[10rem] text-primaryFont" message="Loading Sale Products…" />
  //   );
  // }

  return (
    <section id="sale" className="flex flex-col items-center justify-center gap-10">
      <h2 className="font-heading text-4xl capetilize text-primaryFont">Sale</h2>
  
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 px-[5vw]">
      {products.map((product) => (
        <div key={product.id} className="bg-white  shadow-lg relative grid grid-cols-2 rounded-tr-lg rounded-br-lg">
          <div className='card-img'>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover w-full"
          />
          </div>
          <div className='content px-3 flex flex-col  text-center '>
          <h3 className="mt-4 text-md text-center font-medium font-content tracking-wide">{product.name}</h3>
          <h2 className="font-content text-lg font-medium mt-3">{product.price}</h2>
          <h2> <span className="line-through text-gray-400 text-sm mt-3">{product.oldPrice}</span></h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
            ⭐ {product.rating} <span>{product.reviews}</span>
          </div>
          <div className="absolute top-0 left-0 bg-red-600 text-white text-sm font-bold px-2 py-1 font-content tracking-wide">{product.discount}</div>
         
          <div className="flex justify-between items-center mt-4">
            {/* <Heart className="text-gray-600 cursor-pointer" />
            <ShoppingCart className="text-gray-600 cursor-pointer" /> */}
          </div>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
}
