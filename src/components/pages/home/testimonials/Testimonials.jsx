'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Testimonial from "./components/Testimonial";

const secAssetsDirPath = "/assets/pages/homepage/testimonials";

const testimonials = [
  { id: 1, avatar: { name: "Ella Nasar", profilePic: `${secAssetsDirPath}/1.jpeg` }, rating: 5, text: "This is my third purchase from this jewelry brand, and they never disappoint! The natural stone bracelet I got is stunning, with vibrant colors and a perfect fit. I appreciate that they use sustainable materials. It’s refreshing to support a brand that values both quality and fusion" },
  { id: 2, avatar: { name: "Pallavi Bhadauria", profilePic: `${secAssetsDirPath}/2.jpeg` }, rating: 5, text: "This brand’s jewelry is a game-changer! I bought a necklace set and they’re so versatile—I can mix and match them with any outfit. The quality is top-notch, and they haven’t tarnished at all. Plus, their packaging makes it feel like a gift every time." },
  { id: 3, avatar: { name: "Anupriya Singh", profilePic: `${secAssetsDirPath}/3.jpeg` }, rating: 5, text: "I’m obsessed with my new handcrafted hoop earrings! They’re lightweight, comfortable, and add such a chic touch to my outfits. The brand’s commitment to using ethically sourced materials makes me feel good about my purchase. I’ll definitely be a repeat customer." },
  { id: 4, avatar: { name: "Manisha R Singh", profilePic: `${secAssetsDirPath}/4.jpeg` }, rating: 5, text: "I purchased a raw stone necklace from this brand, and I’m absolutely in love! The craftsmanship is impeccable, with every detail carefully thought out. It arrived beautifully packaged, and the quality feels so luxurious. I’ve received countless compliments wearing it. Highly recommend!" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6 items-center justify-center mx-5 md:mx-[10vw] mb-[10vw] lg:mx-[104px] mt-8 lg:mt-10">
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
