'use client';

import {
  CarouselProvider,
  Slider,
  Slide,
} from 'pure-react-carousel';

import React, { useState, useEffect, useContext } from "react";
import { context } from '@/context-API/context';

import Product from '@/components/global/Product';

import useVisibleSlides from '@/utils/hooks/pure-react-carousel/useVisibleSlides';


export default function ProductsCarousel({

  visibleSlides: {
    desktop = 4,
    tablet = 3,
    mobile = 2
  } = {},

  className = "",
  headingClassName = "",
  heading = "",

  carousel: {
    isPlaying = false,
    interval = 5000,
    playDirection = "forward"
  } = {},

  sliderClassName = "",
  slideClassName = "",
  slideInnerClassName = "",

  data: {
    products = [],
    cartProduct = [],
    productComponent =
    <Product
      product={null}
      cartProduct={null}
      imgContClassName="relative w-[43vw] h-[43vw] sm:w-[29vw] sm:h-[29vw] lg:w-[21vw] lg:h-[21vw]"
      productDetailsContClassName="text-xs text-primaryFont"
      productNameClassName="uppercase"
      btnTextClassName="text-2xs uppercase bg-white text-primaryFont border border-primaryFont xs:text-xs hover:bg-primaryFont hover:text-white transition-colors duration-300 ease-in-out font-bold"
      iconContClassName="text-lg p-2 bg-white text-black"
    />
  } = {}
}) {

  const [isTouchInteracting, setIsTouchInteracting] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(isPlaying);

  const { data: { triggered } = {}, data: { states } = {} } = useContext(context) || {};


  useEffect(() => {

    function handleProductGalleryCarouselInteractions() {

      if (triggered) {
        setIsTouchInteracting(!(states?.productGalleryCarousel?.isTouchInteracting));
      }

      if (keepPlaying && triggered && states?.productGalleryCarousel?.hasInteracted) {
        setKeepPlaying(false);
      }
    }

    handleProductGalleryCarouselInteractions();
  },
    [
      keepPlaying,
      triggered,
      states?.productGalleryCarousel?.isTouchInteracting,
      states?.productGalleryCarousel?.hasInteracted
    ]
  );


  const { visibleSlidesCount } = useVisibleSlides({
    desktopVisibleSlidesCount: desktop,
    tabletVisibleSlidesCount: tablet,
    mobileVisibleSlidesCount: mobile
  });


  return (
    <div className={`${className} flex flex-col gap-6`}>
      {heading &&
        <h3 className={`heading ${headingClassName}`}>
          {heading}
        </h3>
      }

      <CarouselProvider
        className="carousel w-screen px-3"
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        isIntrinsicHeight
        visibleSlides={visibleSlidesCount}
        totalSlides={products.length}
        isPlaying={true}
        interval={interval}
        playDirection={playDirection}
        touchEnabled={isTouchInteracting}
      >
        <Slider className={`products-slider ${sliderClassName}`}>
          {products.length > 0 &&
            products.map((product, index) =>
              <Slide
                key={product?.id || index}
                index={index}
                className={`${slideClassName}`}
                innerClassName={`${slideInnerClassName}`}
              >

                {productComponent &&
                  React.cloneElement(productComponent, { product, cartProduct: cartProduct[index] })
                }
              </Slide>
            )
          }
        </Slider>
      </CarouselProvider>
    </div>
  );
}