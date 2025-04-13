'use client';

import Link from "next/link";

import { useEffect, useContext, useState } from "react";
import { context } from "@/context-API/context";
import { storeData } from "@/context-API/actions/action.creators";

import Sidebar from "@/components/general/Sidebar";
import Accordion from "@/components/general/Accordion";


import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import useSidebarUtils from "@/utils/hooks/sidebar/useSidebarUtils";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { userdata } from '@/redux/slices/userdata';
import { buyNow } from '@/redux/slices/buyNow';
import { wishlist } from '@/redux/slices/wishlist';
import { cart } from '@/redux/slices/cart';
import { coupon } from '@/redux/slices/coupon';

import { CATEGORIES, COLLECTIONS } from "@/routes";
import skipMap from "@/utils/functions/general/skipMap";
import { Axios } from "axios";
import { getCategorywpSevice } from "@/app/api/cms/nodeapi/DetailService";


export default function LayoutSidebar() {
  const router = useRouter();
  const { dispatch } = useContext(context);
  const dispatchUser = useDispatch()
  const userData = useSelector(data => data.userDataSlice)
  const totalCartItems = useSelector(
    state => state?.cartReducer?.reduce((sum, item) => sum + item?.quantity, 0) ?? 0
  );
  const totalWishlistItems = useSelector(state => state?.wishlistReducer?.length ?? 0);
  const { sidebarState: [isOpen, setIsOpen], innerRef } = useSidebarUtils();


  useEffect(() => {

    function storeComponentData() {
      dispatch(storeData({ layoutSidebar: [isOpen, setIsOpen] }, "states"));
    }
    storeComponentData();

  }, [isOpen,setIsOpen, dispatch]);


  // const {
  //   data: parentCategories,
  //   isLoading: isParentCategoriesLoading,
  //   isSuccess: isParentCategoriesSuccess
  // } =
  // useQuery({
  //   queryKey: ['parent-categories'],
  //   queryFn: () => getCategories({ parent: 0 }),
  // });

  const [parentCategories, setParentCategories] = useState(null);
  const [isParentCategoriesLoading, setIsParentCategoriesLoading] = useState(true);
  const [isParentCategoriesSuccess, setIsParentCategoriesSuccess] = useState(false);

  useEffect(() => {
    const fetchParentCategories = async () => {
      setIsParentCategoriesLoading(true);
      try {
        const response = await getCategorywpSevice();
        console.log(response, "sidebarresponse")
        setParentCategories(response);
        setIsParentCategoriesSuccess(true);
      } catch (error) {
        console.error("Error fetching parent categories:", error);
        setIsParentCategoriesSuccess(false);
      } finally {
        setIsParentCategoriesLoading(false);
      }
    };

    fetchParentCategories();
  }, []);

  useEffect(()=>{
    console.log(userData,"userData")
  },[userData,isOpen])

  const [collections, setCollections] = useState(null);
  const [isCollectionsLoading, setIsCollectionsLoading] = useState(true);
  const [isCollectionsSuccess, setIsCollectionsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollections = async (attempt = 0) => {
    setIsCollectionsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cms.jiaarajewellery.com/wp-json/custom/v1/getCategories?parent=15"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setCollections(result);
      setIsCollectionsSuccess(true);
    } catch (err) {
      if (attempt < 10) {
        // Retry with exponential backoff (max 30 sec delay)
        setTimeout(() => fetchCollections(attempt + 1), Math.min(1000 * 2 ** attempt, 30000));
      } else {
        setError(err.message);
        setIsCollectionsSuccess(false);
      }
    } finally {
      setIsCollectionsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);


  const closeSidebar = () => setIsOpen(false);


  const Categories = ({ parentCategories, isSuccess }) => (
    isSuccess && (
      <ul className="categories flex flex-col gap-5 ps-5 py-5">
        {skipMap(parentCategories, [{ name: "General" }], (parentCategory, index) => (
          <li key={parentCategory?.id || index} className="category-item">
            <Link
              className="flex justify-between items-center uppercase"
              href={CATEGORIES?.getPathname(parentCategory?.id)}
              onClick={closeSidebar}
            >
              <div className="category-name">
                {parentCategory?.name}
              </div>
              <div className="products-count">
                {`(${parentCategory?.count})`}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  );

  const Collections = ({ collections, isSuccess }) => (
    isSuccess && (
      <ul className="collections flex flex-col gap-5 ps-5 py-5">
        {collections.map((collection, index) => (
          <li key={collection?.id || index} className="collection-item">
            <Link
              className="flex justify-between items-center uppercase"
              href={COLLECTIONS?.getPathname(collection?.id)}
              onClick={closeSidebar}
            >
              <div className="collection-name">
                {collection?.name}
              </div>
              <div className="products-count">
                {`(${collection?.count})`}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  );

 const logout = () => {
  dispatchUser(buyNow.clear())
  dispatchUser(wishlist.clear())
  dispatchUser(cart.clear())
  dispatchUser(userdata.clear())
  dispatchUser(coupon.clear())
    setIsOpen(false)

  }
  return (
    <Sidebar
      key={userData?"logged-in":"logout"}
      innerRef={innerRef}
      isOpen={isOpen}
      innerClassName="bg-white w-64"
    >
      <ul className="sidebar-navigations flex flex-col justify-center px-5">
        <li className="categories-item">
          <Accordion
            className="border-primaryFont text-sm"
            titleClassName="uppercase"
            title={CATEGORIES?.title}
            defaultState={false}
            content={
              <Categories
                parentCategories={parentCategories}
                isSuccess={isParentCategoriesSuccess}
              />
            }
            iconClassName={isParentCategoriesLoading ? "animate-spin" : "text-xl"}
            openIcon={
              isParentCategoriesLoading ? AiOutlineLoading3Quarters : MdOutlineKeyboardArrowDown
            }
            closeIcon={
              isCollectionsLoading ? AiOutlineLoading3Quarters : MdOutlineKeyboardArrowUp
            }
            divider={{
              upper: { isEnabled: true },
              bottom: { isEnabled: true },
            }}
          />
        </li>

        <li className="collections-item">
          <Accordion
            className="border-primaryFont text-sm"
            titleClassName="uppercase"
            title={COLLECTIONS?.title}
            defaultState={false}
            contentClassName="content text-xs"
            content={
              <Collections
                collections={collections}
                isSuccess={isCollectionsSuccess}
              />
            }
            iconClassName={isCollectionsLoading ? "animate-spin" : "text-xl"}
            openIcon={
              isCollectionsLoading ? AiOutlineLoading3Quarters : MdOutlineKeyboardArrowDown
            }
            closeIcon={
              isCollectionsLoading ? AiOutlineLoading3Quarters : MdOutlineKeyboardArrowUp
            }
            divider={{
              upper: { isEnabled: true },
              bottom: { isEnabled: false },
            }}
          />
        </li>
        <li className="collections-item my-2 border-b border-gray-200" style={{ cursor: 'pointer' }} onClick={()=>router.push('/shop')}>
          {`SHOP`}
        </li>
        <li className="collections-item my-2 border-b border-gray-200" style={{ cursor: 'pointer' }} onClick={()=>router.push('/wishlist')}>
          {`MY WISHLIST (${totalWishlistItems})`}
        </li>

        <li className="collections-item my-2 border-b border-gray-200" style={{ cursor: 'pointer' }} onClick={()=>router.push('/cart')}>
          {`MY CART (${totalCartItems})`}
        </li>

        <li className="collections-item my-2">
          {userData ? (
            <div style={{ cursor: 'pointer' }} onClick={() => logout()}>
              <div>LOGOUT</div>
            </div>
          ) : (
            <div style={{ cursor: 'pointer' }}>
              <div>
                <Link href="/sign-in">LOGIN</Link>
              </div>
            </div>
          )}
        </li>

      </ul>
    </Sidebar>
  );
}
