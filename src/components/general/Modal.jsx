import { createPortal } from "react-dom";

import { useRef } from "react";

import useClickOutside from "@/utils/hooks/general/useClickOutside";


export default function Modal({
  className = "",
  isOpen = false,
  setIsOpen = () => { },
  children
}) {

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    setIsOpen(false);
  });


  return (
    (isOpen &&
      createPortal(
        <div className="modal-cont fixed inset-0 bg-black/50 flex justify-center items-center z-30">
          <div
            ref={modalRef}
            className={`modal bg-white rounded-lg p-4 ${className}`}
          >
            {children}
          </div>
        </div>,
        document.body
      )
    )
  );
}