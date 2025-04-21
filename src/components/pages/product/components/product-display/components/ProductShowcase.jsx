import "@/styles/pure-react-carousel.css";

import { useState, useRef } from "react";

import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup
} from 'pure-react-carousel';

import Media from "@/components/general/Media";
import ZoomableImage from "@/components/general/ZoomableImage";

import useWindowSize from "@/utils/hooks/general/useWindowSize";
import useGoToSlide from "@/utils/hooks/pure-react-carousel/useGoToSlide";
import useCurrentSlide from "@/utils/hooks/pure-react-carousel/useCurrentSlide";
import useRemoveExcessBottomPadding from "@/utils/hooks/pure-react-carousel/useRemoveExcessBottomPadding";

import setStatePromptly from "@/utils/functions/general/setStatePromptly";
import ProductUpperOverview from "./general/ProductUpperOverview";
import createObjCommanFunction from "@/utils/functions/general/createCartWishlistObje";


export default function ProductShowcase({ product = null }) {

  const primaryCarouselRef = useRef(null);
  const secondaryCarouselRef = useRef(null);

  const currContRef = useRef(null);

  const { screenWidth, breakpoints: { md } } = useWindowSize();

  const { goToSlide } = useGoToSlide();

  useCurrentSlide({
    carouselRef: primaryCarouselRef,
    onSlideChange: onPrimarySlideChange
  });

  const [
    secondaryCarouselSelectedSlideIndex,
    setSecondaryCarouselSelectedSlideIndex
  ] = useState(undefined);

  const [preventSecondarySlide, setPreventSecondarySlide] = useState(false);

  const {
    sliderTrayWrapClassName,
    carouselSlidePaddingBottom: secondaryCarouselSlidePaddingBottom
  }
    = useRemoveExcessBottomPadding({
      carouselParentNodeRef: currContRef,
      sliderTrayWrapClassName: "secondary-display-product-carousel",
      paddingBottom: screenWidth < md ? "0%" : "470%"
    });


  function onPrimarySlideChange(primarySlideIndex) {

    setSecondaryCarouselSelectedSlideIndex(primarySlideIndex);

    if (preventSecondarySlide) {
      setPreventSecondarySlide(false);
    }
    else {
      goToSlide({
        carouselRef: secondaryCarouselRef,
        slideIndex: primarySlideIndex
      });
    }
  }

  const handleSecondaryCarouselSlide = async slideIndex => {

    await setStatePromptly(setPreventSecondarySlide, true);

    setSecondaryCarouselSelectedSlideIndex(slideIndex);
    goToSlide({
      carouselRef: primaryCarouselRef,
      slideIndex
    });
  };

  const applySecondaryCarouselSlideSelection = slideIndex => {

    if (secondaryCarouselSelectedSlideIndex === slideIndex) {
      return "border-[3px] overlay-black-50 border-quaternaryBackground";
    }
  }

  const handleSecondaryCarouselSlidePaddingBottom = () => {

    if (screenWidth >= md) {
      return { paddingBottom: secondaryCarouselSlidePaddingBottom };
    }
    return {};
  }
  const creatNewObj = (data) => {
    return createObjCommanFunction(data);
  }
  return (
    <div
      ref={currContRef}
      className="product-showcase flex flex-col items-center justify-center gap-2 md:flex-row-reverse md:items-start"
    >
      {screenWidth < md &&
        <ProductUpperOverview
          className="w-full flex justify-between items-start gap-5 px-[4vw]"
          product={product}
          cartProduct={creatNewObj(product)}

        />
      }

      {/* Primary Display Product Carousel */}
      {product?.images?.length > 0 &&
        <CarouselProvider
          ref={primaryCarouselRef}
          className="primary-display-product-carousel w-[95vw] relative md:w-[40vw] lg:w-[24rem]"
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          isIntrinsicHeight
          visibleSlides={1}
          totalSlides={product?.images?.length}
        >
          <Slider className="primary-product-variations-slider select-none cursor-grab active:cursor-grabbing">
            {product?.images?.map((productImage, index) =>
              <Slide
                key={index}
                index={index}
                className="mx-[1.25vw]"
                data-slide-num={index}
              >
                <ZoomableImage
                  image={{
                    className: "object-cover object-center rounded-sm"
                  }}
                  video={{
                    className: "object-fill rounded-sm"
                  }}
                  media={{
                    contClassName: "w-full h-[90vw] max-h-[25rem]",
                    src: productImage?.src,
                    alt: productImage?.alt
                  }}
                  zoom={{
                    className: "lg:w-[40vw] lg:max-w-[30rem] h-[90vw] max-h-[25rem]",
                    portalId: "zoomable-image-preview"
                  }}
                />
              </Slide>
            )}
          </Slider>
          <div className="primary-dots-cont w-full absolute flex flex-wrap justify-center items-center bottom-0">
            <DotGroup className="dot-group mb-3" />
          </div>
        </CarouselProvider>
      }


      {/* Secondary Display Product Carousel */}
      {product?.images?.length > 0 &&
        <CarouselProvider
          ref={secondaryCarouselRef}
          className="secondary-display-product-carousel w-[94vw] flex justify-center items-center md:w-auto"
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          isIntrinsicHeight={screenWidth < md}
          visibleSlides={4}
          totalSlides={product?.images?.length}
          orientation={screenWidth < md ? "horizontal" : "vertical"}
        >
          <Slider
            className="secondary-product-variations-slider select-none active:cursor-grabbing"
            classNameTrayWrap={sliderTrayWrapClassName}
            classNameTray={`
              slider-tray
              ${screenWidth >= md ? "flex flex-col items-center justify-center gap-2" : ""}
            `}
          >
            {product?.images?.map((productImage, index) =>
              <Slide
                key={index}
                index={index}
                className={`
                  mx-[1.8vw]
                  md:size-[4.9rem]
                  md:mx-0
                  ${applySecondaryCarouselSlideSelection(index)}
                `}
                innerClassName="w-[20vw] md:w-full"
                style={handleSecondaryCarouselSlidePaddingBottom}
                data-slide-num={index}
                onClick={() => handleSecondaryCarouselSlide(index)}
              >
                <Media
                  imgContClassName="img-cont size-[20vw] relative md:size-[4.5rem]"
                  imgClassName="object-cover object-center rounded-sm"
                  videoClassName="size-[20vw] object-cover object-center rounded-sm md:size-[4.5rem]"
                  src={productImage?.src}
                  alt={productImage?.alt}
                />
              </Slide>
            )}
          </Slider>
        </CarouselProvider>
      }
    </div>
  );
}