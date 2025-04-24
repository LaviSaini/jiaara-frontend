'use client';

import FilterBar from "@/components/global/filter/FilterBar";
import SearchModel from "@/components/model/SearchFilter";
import ManageProduct from "@/components/pages/product/ManageProduct";
import ManageShop from "@/components/pages/shop/ManageShop";
import { useState } from "react";
import { CiCircleList, CiFilter, CiGrid41 } from "react-icons/ci";


export default function SearchProduct() {



    const toggleSidebar = () =>
        setIsOpen(!isOpen);



    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col w-[70%]">
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
                        <div className="w-[30%]">

                            <FilterBar showHeader={false} className="sticky top-[119px] h-[calc(100vh-132px)] custom-scrollbar" />
                        </div>
                        <div className="w-[70%] px-3">
                            <ManageShop className="category-page" fromSearch={true} otherClasses="grid grid-cols-2" />
                        </div>
                    </div>
                </div>
            </div>
            <SearchModel isOpen={isOpen} closeModel={() => setIsOpen(false)} />
        </>
    );
}