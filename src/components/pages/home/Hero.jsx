'use client';

import "@/styles/pure-react-carousel.css";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useContext } from 'react';

import { 
  CarouselProvider,
  Slider,
  Slide,
  DotGroup
} from 'pure-react-carousel';

import { context } from "@/context-API/context";
import { storeData } from "@/context-API/actions/action.creators";

import useIntersectionObserver from "@/utils/hooks/general/useIntersectionObserver";

import useCurrentSlide from "@/utils/hooks/pure-react-carousel/useCurrentSlide";

import { SHOP } from "@/routes";

const assetsDir = "/assets/pages/homepage/hero";

const images = [
  {
    id: 1,
    src: `${assetsDir}/beautiful-girl.jpg`,
    alt: "Beautiful Girl Wearing Jewellery"
  },

  {
    id: 2,
    src: `${assetsDir}/indo-western.jpg`,
    alt: "Indo Western"
  },
  {
    id: 3,
    src: `${assetsDir}/polki.jpg`,
    alt: "Polki"
  }
];


export default function HeroCarousel() { 

  const sectionRef = useRef(null);
  
  const carouselRef = useRef(null);

  const { dispatch } = useContext(context);

  const isHeroSecVisible = useIntersectionObserver({ sectionRef });
  
  const { currentSlide } = useCurrentSlide({ carouselRef });


  useEffect(() => {

    function storeComponentData() {
      dispatch(storeData({ isHeroSecVisible }, "states"));
    }
    storeComponentData();

  }, [isHeroSecVisible, dispatch]);
   

  return (
    <section id="hero" ref={sectionRef}>
      <CarouselProvider
        ref={carouselRef}
        className="carousel w-screen relative"
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        isIntrinsicHeight
        visibleSlides={1}
        totalSlides={images.length}
        isPlaying
        lockOnWindowScroll
        touchEnabled={false}
        dragEnabled={false}
      >
        <Slider className="hero-slides">
          {images.map((image, index) =>
            <Slide
              key={image.id}
              index={index}
              className={`
                pt-[37rem]
                transition-transform duration-[5000ms] ease-in-out
                ${currentSlide === index ? "scale-125" : "scale-100"}
              `}
            >
              <div className="image-cont size-full">
                <Image
                  className="static object-cover object-center"
                  fill
                  src={image.src}
                  alt={image.alt}
                />
              </div>
            </Slide>
          )}
        </Slider>
        <div className={`
          content
          w-full px-6 py-6
          absolute right-1/2 bottom-[10%] translate-x-1/2
          flex flex-col items-center justify-center gap-7
          select-none
          text-white
          lg:gap-10
        `}>
          <div className="text text-center sm:text-xl lg:text-2xl 2xl:text-3xl">
            <p className="font-banner text-7xl">
            Elegance you can mean, moments you can cherish.
            </p>
          </div>
          <Link
            className={`
              font-content
              carousel-button
              px-[3vw] py-3
              rounded-full
              uppercase
              bg-primaryButton
              text-primaryFont
              sm:text-md lg:text-lg 2xl:text-2xl
            `}
            href={SHOP?.pathname}
          >
            Explore
          </Link>
          <DotGroup className="dot-group absolute bottom-0"/>
        </div>
      </CarouselProvider>
    </section>
  );
}