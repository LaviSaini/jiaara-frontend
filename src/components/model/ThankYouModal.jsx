import { createPortal } from "react-dom";

import { useRef } from "react";

import useClickOutside from "@/utils/hooks/general/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { userdata } from "@/redux/slices/userdata";
import { getCartListService, getWishListService } from "@/app/api/cms/nodeapi/DetailService";
import { cart } from "@/redux/slices/cart";
import { wishlist } from "@/redux/slices/wishlist";
import LogIn from "../pages/log-in-form/LogIn";
import Icon from "../general/Icon";
import Thankyou from "@/app/thankyou/page";


export default function ThankYouModal({
    className = "",
    isOpen,
    setIsOpen = () => { },
    closeModel
}) {
    const modalRef = useRef(null);



    return (
        (isOpen &&
            createPortal(
                <div className="modal-cont fixed inset-0 bg-black/50 flex justify-center items-center z-30">
                    <div
                        ref={modalRef}
                        className={`modal bg-white rounded-lg p-4 loginModel ${className}`}
                    >
                        <div className="flex justify-end " onClick={() => closeModel()}>
                            <Icon icon={'/assets/icons/close.png'} className="relative size-[15px]   " />
                        </div>
                        <Thankyou />
                    </div>
                </div>,
                document.body
            )
        )
    );
}