'use client';

import { useEffect, useContext } from "react";
import { context } from "@/context-API/context";
import { storeData } from "@/context-API/actions/action.creators";

import { useForm, FormProvider } from 'react-hook-form';

import { CiFilter, CiCircleList, CiGrid41 } from "react-icons/ci";

import AutoSelect from "@/components/general/AutoSelect";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

export default function FilterBar({ className = '', showHeader, closeModel,fetchData,clearFilter }) {

  const categoryList = useSelector(data => data.categorySlice)
  const collectionList=useSelector(data=>data.collectionSlice);
  const [price,setPrice]=useState(1000);
  const [selectedCategory,setSelectedCategory]=useState('');
  const [selectedMaterial,setSelectedMaterial]=useState('');

  const selectProduct=(item)=>{
    if(selectedCategory==item.name){
      setSelectedCategory('')
    }else{
      setSelectedCategory(item.name)
    }
  }
  const selectMaterial=(item)=>{
    if(selectedMaterial==item.name){
      setSelectedMaterial('')
    }else{
      setSelectedMaterial(item.name)
    }
  }
  const applyFilter=()=>{
    fetchData({category:selectedCategory,material:selectedMaterial,min:500,max:price})
  }
  const selectRange=(e)=>{
    setPrice(e)
  }
  return (
    <div className={`bg-white p-4 rounded-lg shadow-lg ${className}`}>
      {
        showHeader ?
          <div className="modal-header flex flex-row items-center justify-between mb-4 border-b">
            <h2 className="text-md font-medium">Filter Products</h2>
            <button
              onClick={() => closeModel()}
              className="text-gray-500 hover:text-black text-3xl"
            >
              ×
            </button>
          </div>
          :
          ''
      }

      {/* Price Filter */}
      <div className="mb-4">

        <div className="flex justify-between mb-4 lg:h-[17px]">

          <h3 className="font-semibold uppercase text-sm  tracking-wide">Widget Price Filter</h3>
          <div className="flex">
            <span className="mx-2 text-primaryFont h-fit hover:border-b-2 hover:border-primaryFont hover:font-semibold cursor-pointer" onClick={()=>applyFilter()}>Apply</span>
            <span className="text-primaryFont h-fit hover:border-b-2 hover:border-primaryFont hover:font-semibold cursor-pointer" onClick={()=>clearFilter()}>Clear</span>
          </div>
        </div>
        <div className="flex justify-between gap-2 mb-2">
          <div>
            <label className="text-xs text-gray-500">Min Price</label>
            <input type="text" value="₹500" className="w-full border px-3 py-2 rounded text-center" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Max Price</label>
            <input type="text" value={`$${price}`} className="w-full border px-3 py-2 rounded text-center" readOnly />
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <input onChange={(e)=>selectRange(e.target.value)} type="range" min="500" max="5000"  className="w-full accent-black" />
        </div>
        <p className="text-xs my-2">PRICE RANGE : ₹ 500 - ₹ {price}</p>
      </div>
      {/* Product Categories */}
      <div className="mb-4">
        <h3 className="font-semibold uppercase text-sm mb-4 tracking-wide">Product Categories</h3>
        <div className="space-y-2 text-sm leading-6">
          {categoryList.map((item) => (
            <label key={item.id} className={`flex items-center gap-2 ${selectedCategory==item?.name ? 'font-semibold' : ''}`}>
              <input
                type="checkbox"
                checked={selectedCategory==item?.name}
                className="accent-black w-4 h-4" onChange={()=>selectProduct(item)}
                defaultChecked={item.checked}
              />
              <span>{item.name}</span>
              <span className="ml-auto text-gray-500">({item.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter by Material */}
      <div className="mb-4">
        <h3 className="font-semibold uppercase text-sm mb-4 tracking-wide">Filter by Material</h3>
        <div className="space-y-2 text-sm leading-6">
          {collectionList?.map((item) => (
            <label key={item.label} className={`flex items-center gap-2 ${selectedMaterial==item?.name ? 'font-semibold' : ''}`}>
              <input
                type="checkbox"
                checked={selectedMaterial==item?.name}
                className="accent-black w-4 h-4" onChange={()=>selectMaterial(item)}
                defaultChecked={item.checked}
              />
              <span>{item.name}</span>
              <span className="ml-auto text-gray-500">({item.count})</span>
            </label>
          ))}
        </div>
      </div>
      <div className="border-t">
         
      </div>
    </div>
  );
}
