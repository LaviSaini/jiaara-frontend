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


export default function LoginModel({
    className = "",
    isOpen,
    setIsOpen = () => { },
    closeModel
}) {

    const modalRef = useRef(null);
    const dispatch = useDispatch();
    useClickOutside(modalRef, () => {
        setIsOpen(false);
    });

    const userLogin = (data) => {
        console.log(data)
        dispatch(userdata.add({ userId: data?.id }));
        fetchCartList(data?.id);
        fetchWishList(data?.id)
        closeModel()
    }
    const fetchCartList = async (userId) => {

        const response = await getCartListService(userId);
        if (response?.response?.success) {
            if (response?.response?.data?.length > 0) {
                dispatch(cart.addAll(response?.response?.data))
            }

        }
    }
    const fetchWishList = async (userId) => {

        const response = await getWishListService(userId);
        if (response?.response?.success) {
            if (response?.response?.data?.length > 0) {
                dispatch(wishlist.addAll(response?.response?.data))
            }
        }
    }
    return (
        (isOpen &&
            createPortal(
                <div className="modal-cont fixed inset-0 bg-black/50 flex justify-center items-center z-30">
                    <div
                        ref={modalRef}
                        className={`modal bg-white rounded-lg p-4 ${className}`}
                    >
                        <div className="flex justify-end " onClick={() => closeModel()}>
                            <Icon icon={'/assets/icons/close.png'} className="relative size-[15px]   " />
                        </div>
                        <LogIn isPopUp={true} userlogin={userLogin} />
                    </div>
                </div>,
                document.body
            )
        )
    );
}