'use client';

import { useEffect, useContext } from "react";
import { context } from "@/context-API/context";
import { storeData } from "@/context-API/actions/action.creators";

import { useForm, FormProvider } from 'react-hook-form';

import { CiFilter, CiCircleList, CiGrid41 } from "react-icons/ci";

import AutoSelect from "@/components/general/AutoSelect";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function FilterBar({ className = "" }) {

  const {
    data: { triggered } = {},
    data: { states, objects } = {},
    dispatch
  } = useContext(context) || {};

  // const [isOpen, setIsOpen]
  //   = triggered && Array.isArray(states?.sidebar) ? states?.sidebar : [false, () => { }];

  const toggleSidebar = () =>
    setIsOpen(!isOpen);


  const methods = useForm({ mode: "onChange" });

  const currSortMethod = methods?.watch("sortMethod");

  useEffect(() => {

    function storeComponentData() {

      const previousFilter = objects?.filter || {};

      const newFilter = {
        ...previousFilter,
        currSortMethod
      };

      if (JSON.stringify(previousFilter) !== JSON.stringify(newFilter)) {
        dispatch(storeData({ filter: newFilter }, "objects"));
      }
    }

    storeComponentData();
  }, [currSortMethod, objects?.filter, dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`filter-bar flex flex-col px-4 md:px-20 ${className}`}>
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

      {/* <FormProvider {...methods}>
        <form className="wrapper w-full flex justify-center items-center px-[5vw] mt-5">
          <AutoSelect
            className="w-full"
            input={{
              id: "sort-method-select",
              inputName: "sortMethod",
              className: "w-[inherit] border rounded-md px-3 py-2 text-sm border-quaternaryBackground input-selection-primaryFont hover:ring-secondaryBackground focus:ring-primaryFont cursor-default",
              placeholder: "Select Sort",
              autoComplete: "off",
              required: true,
              readOnly: true
            }}
            dropdownClassName="border rounded overflow-y-auto text-sm border-quaternaryBackground bg-white"
            optionClassName={{
              hover: "hover:bg-quinaryBackground",
              selection: "bg-primaryFont text-white hover:bg-primaryFont hover:text-white"
            }}
            defaultOption="Default"
            options={["Default", "Best Seller", "Latest", "Trending", "Rating"]}
          />

          <hr className="vertical-divider w-[5rem] rotate-90 border-quaternaryBackground" />

          <AutoSelect
            className="w-full"
            input={{
              id: "order-select",
              inputName: "orderMethod",
              className: "w-[inherit] border rounded-md px-3 py-2 text-sm border-quaternaryBackground input-selection-primaryFont hover:ring-secondaryBackground focus:ring-primaryFont cursor-default",
              placeholder: "Sort Order",
              autoComplete: "off",
              required: true,
              readOnly: true
            }}
            dropdownClassName="border rounded overflow-y-auto text-sm border-quaternaryBackground bg-white"
            optionClassName={{
              hover: "hover:bg-quinaryBackground",
              selection: "bg-primaryFont text-white hover:bg-primaryFont hover:text-white"
            }}
            options={["Ascending", "Descending"]}
          />
        </form>
      </FormProvider> */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md">
              <div className="modal-header flex flex-row items-center justify-between mb-4 border-b">
                <h2 className="text-md font-medium">Filter Products</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-black text-3xl"
                >
                  ×
                </button>
              </div>
              {/* Price Filter */}
              <div className="mb-4">
                <h3 className="font-semibold uppercase text-sm mb-4 tracking-wide">Widget Price Filter</h3>
                <div className="flex justify-between gap-2 mb-2">
                  <div>
                    <label className="text-xs text-gray-500">Min Price</label>
                    <input type="text" value="₹500" className="w-full border px-3 py-2 rounded text-center" readOnly />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Max Price</label>
                    <input type="text" value="₹2000" className="w-full border px-3 py-2 rounded text-center" readOnly />
                  </div>
                </div>
                <div className="w-full flex justify-between items-center">
                  <input type="range" min="500" max="2000" value="500" className="w-full accent-black" />
                </div>
                <p className="text-xs my-2">PRICE RANGE : ₹ 500 - ₹ 2000</p>
              </div>
              {/* Product Categories */}
              <div className="mb-4">
                <h3 className="font-semibold uppercase text-sm mb-4 tracking-wide">Product Categories</h3>
                <div className="space-y-2 text-sm leading-6">
                  {[
                    { label: 'Bracelets', count: 22 },
                    { label: 'Earrings', count: 34, checked: true },
                    { label: 'Gold Set', count: 18 },
                    { label: 'Necklaces', count: 19 },
                    { label: 'Rings', count: 30 },
                    { label: 'Silver Set', count: 18 }
                  ].map((item) => (
                    <label key={item.label} className={`flex items-center gap-2 ${item.checked ? 'font-semibold' : ''}`}>
                      <input
                        type="checkbox"
                        className="accent-black w-4 h-4"
                        defaultChecked={item.checked}
                      />
                      <span>{item.label}</span>
                      <span className="ml-auto text-gray-500">({item.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Material */}
              <div className="mb-4">
                <h3 className="font-semibold uppercase text-sm mb-4 tracking-wide">Filter by Material</h3>
                <div className="space-y-2 text-sm leading-6">
                  {[
                    { label: 'Gold', count: 36, checked: true },
                    { label: 'Platinum', count: 12 },
                    { label: 'Rose Gold', count: 17 },
                    { label: 'Sterling Silver', count: 26 },
                    { label: 'Brass', count: 34 }
                  ].map((item) => (
                    <label key={item.label} className={`flex items-center gap-2 ${item.checked ? 'font-semibold' : ''}`}>
                      <input
                        type="checkbox"
                        className="accent-black w-4 h-4"
                        defaultChecked={item.checked}
                      />
                      <span>{item.label}</span>
                      <span className="ml-auto text-gray-500">({item.count})</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="border-t">
                <button
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
