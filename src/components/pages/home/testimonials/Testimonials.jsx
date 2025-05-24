'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Testimonial from "./components/Testimonial";

const secAssetsDirPath = "/assets/pages/homepage/testimonials";

const testimonials = [
  { id: 1, avatar: { name: "Elizabeth Jeff", profilePic: `${secAssetsDirPath}/1.jpg` }, rating: 3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod.." },
  { id: 2, avatar: { name: "Emily Thomas", profilePic: `${secAssetsDirPath}/2.jpg` }, rating: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod.." },
  { id: 3, avatar: { name: "Helen Paquet", profilePic: `${secAssetsDirPath}/3.jpg` }, rating: 4.4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod.." },
  { id: 4, avatar: { name: "Salena Gomez", profilePic: `${secAssetsDirPath}/2.jpg` }, rating: 3.5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod.." },
  { id: 5, avatar: { name: "Rihana", profilePic: `${secAssetsDirPath}/1.jpg` }, rating: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod.." },
  { id: 6, avatar: { name: "Taylor Swift", profilePic: `${secAssetsDirPath}/3.jpg` }, rating: 4.5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod.." },
  { id: 7, avatar: { name: "Angela Jolie", profilePic: `${secAssetsDirPath}/2.jpg` }, rating: 4.7, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla nulla. Aliquam erat volutpat. Sed euismod.." }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6 items-center justify-center mx-5 md:mx-[10vw] mb-[10vw] mt-8 lg:mt-10">
   <div className="col-span-1 max-w-md testimonialsDiv">
    <h2 className="font-heading text-3xl md:text-6xl lg:text-6xl capitalize text-primaryFont mb-4 testimonialHEading">
      What Our Customers Say!
    </h2>
    <p className="font-content text-md text-center lg:text-left leading-7">
              “Thank you so much for your glowing review! We’re thrilled that you love our jewelry and appreciate your kind words. Your satisfaction is our top priority, and we’re committed to continuing to provide you with exquisite designs and exceptional service. We look forward to being a part of your future special moments.”
            </p>
    </div>

      <div className="col-span-2 lg:ps-10 w-full h-[460px] lg:h-[500px]">
        <Swiper
          modules={[Autoplay, Mousewheel]}
          spaceBetween={20}
          slidesPerView={3} // Show 2 testimonials at once
          slidesPerGroup={1} // Scroll 1 item at a time
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          direction="vertical"
          loop={true}
          className="w-full h-full"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="p-2">
              <Testimonial testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
