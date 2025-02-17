'use client';

import Link from "next/link";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "@/styles/react-alice-carousel.css";

import { useState, useEffect, useRef, useContext } from "react";

import { context } from "@/context-API/context";
import { storeData } from "@/context-API/actions/action.creators";

import Media from "@/components/general/Media";

import useClickTracker from "@/utils/hooks/general/useClickTracker";
import useDotsGroupPosition from "@/utils/hooks/alice-react-carousel/useDotsGroupPosition";

import { PRODUCT } from "@/routes";


export default function ProductGalleryCarousel({
  product = null,

  media = {
    contClassName = "",
    className = ""
  } = {},

  dotsGroupPosition = {
    global: '0',
    breakpoints: {}
  }

} = {}) {
  console.log("HELO HELO", product)

  const { dispatch } = useContext(context);

  const { clickType, handleMouseUp, handleMouseDown } = useClickTracker({ threshold: 200 });

  const carouselRef = useRef(null);
  const carouselNodeRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const [isTouchInteracting, setIsTouchInteracting] = useState(false);


  const handleLinkOnClick = event => {

    if (clickType === "held") {
      event.preventDefault();
    }
  }


  const handleInteraction = (event = null) => {

    if (event) {
      if (event.type === "mousedown") {
        event.preventDefault();
      }
      event.stopPropagation();
    }

    if (!hasInteracted) {

      dispatch(storeData({
        productGalleryCarousel: {
          hasInteracted: true
        }
      }, "states"));

      setHasInteracted(true);
    }
  }

  useEffect(() => {

    if (product?.gallery?.length <= 1) {
      return;
    }

    let intervalId;

    if (isCarouselHovered && !hasInteracted) {
      intervalId = setInterval(() =>
        carouselRef?.current?.slideNext(),
        carouselRef.current.props.autoPlayInterval
      );
    }
    else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);

  }, [isCarouselHovered, hasInteracted]);


  const handleIsTouchInteracting = (event = null) => {

    if (event) {
      if (event.type === "touchstart") {
        setIsTouchInteracting(true);
      }
      else if (event.type === "touchend") {
        setIsTouchInteracting(false);
      }
    }
  }

  useEffect(() => {

    function handleTouchInteraction() {

      dispatch(storeData({
        productGalleryCarousel: {
          isTouchInteracting
        }
      }, "states"));
    }

    handleTouchInteraction();

  }, [isTouchInteracting, dispatch]);


  useDotsGroupPosition({
    carouselNodeRef,
    position: dotsGroupPosition
  });


  return (
    (product?.images?.length > 0 &&
      <div
        ref={carouselNodeRef}
        className={`alice-carousel-wrapper ${media.contClassName} bg-senaryBackground`}
        onMouseEnter={() => setIsCarouselHovered(true)}
        onMouseLeave={() => setIsCarouselHovered(false)}
        onMouseDown={handleInteraction}
        onTouchStart={handleIsTouchInteracting}
        onTouchEnd={handleIsTouchInteracting}
      >
        <AliceCarousel
          ref={carouselRef}
          autoPlayInterval={1000}
          infinite
          mouseTracking={true}
          disableButtonsControls
          syncStateOnPropsUpdate
          activeIndex={activeIndex}
          onSlideChanged={item => setActiveIndex(item?.slide)}
        >
          {product?.images?.map((image, index) => (
            <Link
              key={index}
              className={`product-link w-[inherit] h-[inherit] active:cursor-grabbing`}
              href={PRODUCT?.getPathname(product?.id) ?? ""}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={handleLinkOnClick}
            >
              <Media
                imgContClassName={`${media.contClassName}`}
                imgClassName={`${media.className}`}
                videoClassName={`${media.contClassName} object-fill object-center`}
                src={image?.src}
                alt={image?.alt ? image?.alt : `${product?.name}: ${index + 1}`}
              />
            </Link>
          ))}
        </AliceCarousel>

        {product?.onSale &&
          <span
            className={`
              discount-percent
              absolute top-0 left-0
              px-2 py-1 rounded-tl-sm
              text-xs xs:text-sm
              bg-red-500 text-white
            `}
          >
            {product?.discountPercentage}
          </span>
        }
      </div>
    )
  );
}