'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function FollowOnInstagram() {
  const [list, setInstaList] = useState([]);

  const fetchInstaPost = async () => {
    try {
      const response = await axios.get(
        'https://cms.jiaarajewellery.com/wp-json/custom/v1/instagram-code'
      );

      if (response.status === 200) {
        const { instagram_code } = response.data;

        if (Array.isArray(response.data)) {
          setInstaList(response.data);
        } else if (typeof response.data === 'string') {
          setInstaList([response.data]);
        } else {
          console.warn('Unexpected Instagram code format:', response.data);
        }
      }
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
    }
  };

  useEffect(() => {
    fetchInstaPost();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window?.instgrm?.Embeds?.process) {
          window.instgrm.Embeds.process();
        }
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [list]);

  return (
    <section
      id="follow-on-instagram"
      className="flex flex-col items-center justify-center"
    >
      <h2 className="font-heading text-center text-3xl lg:text-4xl uppercase text-primaryFont leading-10 my-8 lg:my-10">
        <span className="text-3xl">Follow Us On</span>
        <br /> Instagram
      </h2>

      <div className="w-full max-w-[90vw] mx-auto">
        {console.log("---------Parveen",list)}
        <Swiper
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
          {list.map((embedCode, index) => (
            <SwiperSlide key={index}>
              <div className="p-2">
                <div
                  className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 instagram-wrapper"
                  dangerouslySetInnerHTML={{ __html: embedCode }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .instagram-wrapper {
          max-height: 620px; /* Set your desired height */
          overflow: hidden;
        }

        .instagram-media {
          max-height: 420px !important;
          overflow: hidden !important;
        }

        .instagram-media > div {
          max-height: 100% !important;
          overflow: hidden !important;
        }

        .instagram-media .e1e1d {
          display: none !important; /* Hide like/comment icons if they appear */
        }

        iframe {
          max-height: 100% !important;
        }
      `}</style>
    </section>
  );
}
