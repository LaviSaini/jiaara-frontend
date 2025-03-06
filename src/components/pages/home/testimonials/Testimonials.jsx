'use client';

import { useRef } from "react";

import { 
  CarouselProvider,
  Slider,
  Slide,
} from 'pure-react-carousel';

import Testimonial from "./components/Testimonial";

import useWindowSize from "@/utils/hooks/general/useWindowSize";
import useRemoveExcessBottomPadding from "@/utils/hooks/pure-react-carousel/useRemoveExcessBottomPadding";
import useClamp from "@/utils/hooks/general/useClamp";

import createPairsArr from "@/utils/functions/general/createPairsArr";


const secAssetsDirPath = "/assets/pages/homepage/testimonials";

const testimonials = [
  {
    id: 1,
    avatar: {
      name: "Elizabeth Jeff",
      profilePic: `${secAssetsDirPath}/1.jpg`
    },
    rating: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod, lorem in vestibulum volutpat, eros lacus facilisis velit, non vulputate sapien felis a magna.",
  },
  {
    id: 2,
    avatar: {
      name: "Emily Thomas",
      profilePic: `${secAssetsDirPath}/2.jpg`
    },
    rating: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod, lorem in vestibulum volutpat, eros lacus facilisis velit, non vulputate sapien felis a magna.",
  },
  {
    id: 3,
    avatar: {
      name: "Helen Paquet",
      profilePic: `${secAssetsDirPath}/3.jpg`
    },
    rating: 4.4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod, lorem in vestibulum volutpat, eros lacus facilisis velit, non vulputate sapien felis a magna.",
  },
  {
    id: 4,
    avatar: {
      name: "Salena Gomez",
      profilePic: `${secAssetsDirPath}/2.jpg`
    },
    rating: 3.5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod, lorem in vestibulum volutpat, eros lacus facilisis velit, non vulputate sapien felis a magna.",
  },
  {
    id: 5,
    avatar: {
      name: "Rihana",
      profilePic: `${secAssetsDirPath}/1.jpg`
    },
    rating: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod, lorem in vestibulum volutpat, eros lacus facilisis velit, non vulputate sapien felis a magna.",
  },
  {
    id: 6,
    avatar: {
      name: "Taylor Swift",
      profilePic: `${secAssetsDirPath}/3.jpg`
    },
    rating: 4.5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod, lorem in vestibulum volutpat, eros lacus facilisis velit, non vulputate sapien felis a magna.",
  },
  {
    id: 7,
    avatar: {
      name: "Angela Jolie",
      profilePic: `${secAssetsDirPath}/2.jpg`
    },
    rating: 4.7,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod, lorem in vestibulum volutpat, eros lacus facilisis velit, non vulputate sapien felis a magna.",
  }
];


export default function Testimonials() {

  const currSecRef = useRef(null);

  const autoPlayInterval = 3000;

  const { screenWidth, breakpoints: { lg } } = useWindowSize();

  const { clamp } = useClamp();

  const { sliderTrayWrapClassName, carouselSlidePaddingBottom } = useRemoveExcessBottomPadding({ 
    carouselParentNodeRef: currSecRef,
    sliderTrayWrapClassName: "testimonials",
    paddingBottom: clamp({ 
      xs: { min: 22, current: 66, max: 32 },
      lg: { min: 23, current: 0, max: 23 }
    })
  });

  
  return (
    <section
      id="testimonials"
      ref={currSecRef}
      className="grid grid-cols-3 gap-4 items-center justify-center mx-[10vw]"
    >
     <div className="col-span-1 max-w-md">
      <h2 className="font-heading text-6xl capitalize text-primaryFont mb-4">
        What Our Customers Say!
      </h2>
      <p className="font-content text-md leading-7">
              “Thank you so much for your glowing review! We’re thrilled that you love our jewelry and appreciate your kind words. Your satisfaction is our top priority, and we’re committed to continuing to provide you with exquisite designs and exceptional service. We look forward to being a part of your future special moments.”
            </p>
      </div>
      <CarouselProvider
        className="carousel col-span-2 ps-20"
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={testimonials.length}
        isPlaying
        interval={autoPlayInterval}
        step={screenWidth < lg ? 1 : 2}
        orientation="vertical"
      >
        <Slider
          className="testimonials-slider mx-[3vw] select-none cursor-grab active:cursor-grabbing"       
          classNameTrayWrap={sliderTrayWrapClassName}
          classNameTray="flex flex-col items-center justify-center gap-7"
        >
          {screenWidth >= lg &&
            createPairsArr(testimonials).map((testimonialPair, index) => (
              <Slide
                key={index}
                index={index}
                className="h-36"
                innerClassName="flex justify-center items-center gap-7"
                style={{ paddingBottom: carouselSlidePaddingBottom }}
              >
                {testimonialPair.map(testimonial => (
                  <Testimonial
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </Slide>
            ))
          }
          {screenWidth < lg &&
            testimonials.map((testimonial, index) => (
              <Slide
                key={testimonial.id}
                index={index}
                className="h-36"
                innerClassName="flex justify-center items-center gap-7"
                style={{ paddingBottom: carouselSlidePaddingBottom }}
              >
                <Testimonial
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              </Slide>
            ))
          }
        </Slider>   
      </CarouselProvider>
    </section>
  );
}
