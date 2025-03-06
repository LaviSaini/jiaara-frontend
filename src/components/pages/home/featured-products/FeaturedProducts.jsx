'use client';
import { useState } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const products = {
  bestSeller: [
    { id: 1, title: 'Etch Chain Bracelet', price: '₹ 9,200.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FNecklaces.webp&w=1920&q=75' },
    { id: 2, title: 'Heart Pearl Hoops', price: '₹ 6,300.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FEarrings.webp&w=1920&q=75' },
    { id: 3, title: 'Etch Chain Bracelet', price: '₹ 9,200.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FJhumkas.webp&w=1920&q=75' },
    { id: 4, title: 'Heart Pearl Hoops', price: '₹ 6,300.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FJhumkas.webp&w=1920&q=75' },
    { id: 5, title: 'Etch Chain Bracelet', price: '₹ 9,200.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FNecklaces.webp&w=1920&q=75' },
    { id: 6, title: 'Heart Pearl Hoops', price: '₹ 6,300.00', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcms.jiaarajewellery.com%2Fwp-content%2Fuploads%2F2024%2F11%2FEarrings.webp&w=1920&q=75' },
  ],
  trending: [
    { id: 7, title: 'Danbury Ring', price: '₹ 7,500.00', image: '/images/ring.jpg' },
    { id: 8, title: 'Sahara Pearl Anklet', price: '₹ 5,200.00', image: '/images/anklet.jpg' },
    { id: 9, title: 'Sahara Pearl Anklet', price: '₹ 5,200.00', image: '/images/anklet.jpg' },
    { id: 10, title: 'Sahara Pearl Anklet', price: '₹ 5,200.00', image: '/images/anklet.jpg' },
    { id: 11, title: 'Sahara Pearl Anklet', price: '₹ 5,200.00', image: '/images/anklet.jpg' },
  ]
};
export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('bestSeller');

  const tabChange = (tab) => {
    setActiveTab(tab);
  }
  return (
    <section id="featured-products" className="px-[5vw]">
      <div className="flex flex-row items-center justify-center gap-12">
      <button onClick={()=>tabChange('bestSeller')} className={`font-heading text-center text-4xl capetilize text-primaryFont border-b-2 ${activeTab === 'bestSeller' ? 'border-primaryFont' : 'border-transparent'}`}
        >
       Best Seller
      </button>
      <button onClick={()=>tabChange('trending')} className={`font-heading text-center text-4xl capetilize text-primaryFont border-b-2  ${activeTab === 'trending' ? 'border-primaryFont' : 'border-transparent'}`}
       >Trending</button>
      </div>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={products[activeTab].length}
        visibleSlides={4}
        infinite={true}
        step={1}
      >
        <Slider className="mt-8">
          {products[activeTab].map((product, index) => (
            <Slide index={index} key={product.id}>
              <div className="relative mx-5">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-lg shadow-lg w-full h-[285px] object-cover"
                />
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex flex-col gap-2">
                  <button className="bg-primaryBackground p-2 rounded-full shadow-lg">❤️</button>
                  <button className="bg-primaryBackground p-2 rounded-full shadow-lg">🛒</button>
                </div>
                <h3 className="mt-4 font-heading text-center text-xl tracking-wide">{product.title}</h3>
                <p className="font-heading text-center text-lg tracking-wide">{product.price}</p>
              </div>
            </Slide>
          ))}
        </Slider>

        {/* <div className="flex justify-between mt-6">
          <ButtonBack className="bg-gray-800 text-white p-2 rounded">Back</ButtonBack>
          <ButtonNext className="bg-gray-800 text-white p-2 rounded">Next</ButtonNext>
        </div> */}
      </CarouselProvider>
    </section>
  );
}
