'use client';
import Image from "next/image";
const assetsDirPath = "/assets/pages/homepage/SendGift";


export default function SendGift() {
  return (
    <section className="w-full px-5 mx-auto sm:px-7 md:px-10 lg:px-16 my-8 lg:my-10">
      <div className="flex flex-col md:flex-row lg:mb-4">
          <div className="flex-auto relative bg-[#c788a1]/80 flex items-center justify-center p-8 md:p-12 text-center">
            {/* Ribbon background image */}
            <img
              src={`${assetsDirPath}/gift-bg.jpeg`} // Replace with your ribbon image path
              alt="Ribbon Background"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            {/* Text */}
            <div className="relative z-10 text-left">
              <h2 className="text-white text-2xl md:text-3xl font-semibold mb-2">
                SEND A GIFT TO SOMEONE YOU ADORE
              </h2>
              <p className="text-white text-lg md:text-base opacity-80">
                As people say, good things come in small packages
              </p>
            </div>
          </div>
        <div className="flex-none w-full md:w-[35%] h-[300px] md:h-[380px]">
          <img
            src={`${assetsDirPath}/gift-box.jpeg`} // Replace with your gift box image path
            alt="Gift Boxes"
            className="w-full h-full object-cover"
            width={400}
            height={300}
          />
        </div>
      </div>
    </section>
  )
}