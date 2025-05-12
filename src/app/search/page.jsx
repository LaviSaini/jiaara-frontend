'use client';

import FilterBar from "@/components/global/filter/FilterBar";
import SearchModel from "@/components/model/SearchFilter";
import ManageProduct from "@/components/pages/product/ManageProduct";
import ManageShop from "@/components/pages/shop/ManageShop";
import axios from "axios";
import { useState } from "react";
import { CiCircleList, CiFilter, CiGrid41 } from "react-icons/ci";


export default function SearchProduct() {



    const toggleSidebar = () =>
        setIsOpen(!isOpen);


    const [product,setProductDetail]=useState([])
    const [isOpen, setIsOpen] = useState(false);
    const fetchData=(data)=>{
        console.log(data)
        callApi(data);
    }
    const callApi=async(data)=>{
        // 
        try {
      const response = await axios.get(`https://cms.jiaarajewellery.com/wp-json/custom/v1/filter-product?metal_type=${data?.material}&min_price=${data?.min}&max_price=${data?.max}&category=${data?.category}`);
      if (response?.status === 200) {
        console.log(response)
       setProductDetail(response)
      }
    } catch (error) {
      console.error("Error fetching collections:", error.message);
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
                                    onClick={() => setIsOpen(true)}
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
                        <div className="w-[30%] custom1201:w-[25%]">

                            <FilterBar fetchData={fetchData} showHeader={false} className="sticky top-[119px] h-[calc(100vh-132px)] custom-scrollbar overflow-y-scroll overflow-y-hidden" />
                        </div>
                        <div className="w-[70%] custom1201:w-[75%] px-3">
                            <ManageShop data={product}  className="category-page" fromSearch={true} otherClasses="grid  grid-cols-3 " />
                        </div>
                    </div>
                </div>
            </div>
            <SearchModel isOpen={isOpen} closeModel={() => setIsOpen(false)} />
        </>
    );
}