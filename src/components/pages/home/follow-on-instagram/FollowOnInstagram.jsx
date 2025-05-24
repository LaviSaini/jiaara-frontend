'use client';
import Image from 'next/image';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const images = [
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
];

export default function FollowOnInstagram() {

  return (
    <section id="follow-on-instagram" className="flex flex-col items-center justify-center">
      <h2 className="font-heading text-center text-3xl lg:text-4xl uppercase text-primaryFont leading-10 my-8 lg:my-10">
        <span className="text-3xl">Follow Us On</span><br /> Instagram
      </h2>

      <div className="w-full max-w-[90vw] mx-auto">
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={18}
      slidesPerView={4}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
        1200: { slidesPerView: 4, spaceBetween: 50 },
      }}
    >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="p-2">
                <Image
                  src={img}
                  alt={`Instagram image ${index + 1}`}
                  width={300}
                  height={300}
                  className="shadow-md object-cover w-full h-[300px]"
                />
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
      </div>
    </section>
  );
}
