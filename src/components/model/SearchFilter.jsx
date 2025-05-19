import { createPortal } from "react-dom";

import { useRef } from "react";

import useClickOutside from "@/utils/hooks/general/useClickOutside";
import { useDispatch } from "react-redux";
import FilterBar from "../global/filter/FilterBar";



export default function SearchModel({
    className = "",
    isOpen,
    setIsOpen = () => { },
    closeModel,
    fetchData,
    clearFilter
}) {

    const modalRef = useRef(null);
    const dispatch = useDispatch();
    useClickOutside(modalRef, () => {
        setIsOpen(false);
    });


    return (
        (isOpen &&
            createPortal(
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

                    <FilterBar fetchData={fetchData} clearFilter={clearFilter} showHeader={true} closeModel={closeModel} />
                </div>,
                document.body
            )
        )
    );
}