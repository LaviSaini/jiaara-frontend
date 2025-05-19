'use client';

import FilterBar from "@/components/global/filter/FilterBar";
import SearchModel from "@/components/model/SearchFilter";
import ManageProduct from "@/components/pages/product/ManageProduct";
import ManageShop from "@/components/pages/shop/ManageShop";
import { loaderData } from "@/redux/slices/loader";
import useWindowSize from "@/utils/hooks/general/useWindowSize";
import axios from "axios";
import { useState } from "react";
import { CiCircleList, CiFilter, CiGrid41 } from "react-icons/ci";
import { useDispatch } from "react-redux";


export default function SearchProduct() {


    const dispatch=useDispatch();
    const toggleSidebar = () =>
        setIsOpen(!isOpen);
    const { screenWidth, breakpoints: { lg } } = useWindowSize();

    const [product,setProductDetail]=useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [filterData,setFilterData]=useState(null);
    const fetchData=(data)=>{
        setFilterData(data);
        setIsOpen(false);
        callApi(data,page);
    }
    const [page,setPage]=useState(1);

    const callApi=async(data,page)=>{
        // 
        try {
             dispatch(loaderData.add(true));
             setProductDetail(null)
      const response = await axios.get(`https://cms.jiaarajewellery.com/wp-json/custom-wc2/v1/products?metal_type=${data?.material}&min_price=${data?.min}&max_price=${data?.max}&category=${data?.category}&page=${page}&per_page=10`);
      if (response?.status === 200) {
 
          
          setProductDetail(response)
        }
        dispatch(loaderData.add(false));
    } catch (error) {
        dispatch(loaderData.add(false));

      console.error("Error fetching collections:", error.message);
    }
    }
    const clearFilter=()=>{
        setIsOpen(false)
        setProductDetail(null)
    }
    const changePage=(page)=>{
        callApi(filterData,page)
    }
    const da=()=>{
        if(screenWidth<1024){
            setIsOpen(true)
        }
    }
    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col w-[100%] px-4 pt-4 ">
                    <div className={`filter-bar flex flex-col `}>
                        <div className="filter-header flex flex-row items-center justify-between">
                            <div className="flex flex-row">
                                <button
                                    className="filter-bar group flex items-center gap-1 py-3 pe-2 text-primaryFont"
                                    onClick={() =>da()}
                                >
                                    <CiFilter className="filter-icon text-lg group-hover:stroke-1" />
                                    <span className="text-sm uppercase group-hover:font-semibold">
                                        Filter
                                    </span>
                                </button>
                                <button
                                    className="filter-bar group flex items-center gap-1 py-3 text-primaryFont"
                                    onClick={toggleSidebar}
                                >
                                    <CiFilter className="filter-icon text-lg group-hover:stroke-1" />
                                    <span className="text-sm uppercase group-hover:font-semibold">
                                        Sort
                                    </span>
                                </button>
                            </div>

                            <div className="flex flex-row gap-2">
                                <CiCircleList className="filter-icon text-xl group-hover:stroke-1" />
                                <CiGrid41 className="filter-icon text-xl group-hover:stroke-1" />
                            </div>
                        </div>
                        <hr className="divider border-quaternaryBackground" />



                    </div>
                    <div className="flex mt-4">
                        <div className="w-[30%] hidden lg:block custom1201:w-[25%]">

                            <FilterBar fetchData={fetchData} clearFilter={clearFilter} showHeader={false} className="sticky top-[119px] h-[calc(100vh-132px)] custom-scrollbar overflow-y-scroll overflow-y-hidden" />
                        </div>
                        <div className="w-full lg:w-[70%] custom1201:w-[75%] px-3">
                            {
                                product &&
                            <ManageShop data={product}  className="category-page" fromSearch={true} otherClasses="grid  grid-cols-3 " searchCallBack={changePage} />
                            }
                            {
                                !product && 
                                <div className="flex justify-center">Search Product</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <SearchModel  fetchData={fetchData} clearFilter={clearFilter} isOpen={isOpen} closeModel={() => setIsOpen(false)} />
        </>
    );
}