import Link from "next/link";
import Image from "next/image";

import { SHOP } from "@/routes";


const secAssetsDir = "/assets/pages/homepage/deal";


export default function FeaturedDeals() {

  return (
    <section
      id="featured-deals"
      className="flex flex-col items-center justify-center gap-12 mx-[6vw] md:mx-[10vw] lg:mx-[7vw] mt-8 lg-mt-10"
    >
      {/* <h2 className="heading text-center px-5 text-4xl uppercase text-primaryFont">
        Featured Deals
      </h2> */}

      <div className="featured-deals-cont w-full flex flex-col p-5 bg-white md:flex-row">

        <div className="img-cont relative w-[inherit] h-[20rem] md:w-[50%] md:h-auto">
          <Image
            className="object-cover object-center rounded-lg"
            fill
            src={`${secAssetsDir}/1.png`}
            alt="Featured Deals Image"
          />
        </div>

        <div className="deal-content py-[40px] lg:px-[55px] md:px-[16px] bg-white sm:gap-7 sm:p-15 md:w-[50%]">
          <h3 className="font-content text-sm uppercase mb-4 leading-3 font-semibold">
            Deal of the Week
          </h3>
          <h4 className="font-heading text-3xl md:text-3xl lg:text-5xl capitalize mb-5">
            Elin Stacking Crystal Earrings
          </h4>

          <p className="font-content md:text-sm lg:text-md tracking-wide leading-6">
            Designed to be worn solo or stacked for a bolder look. Each earring features dazzling crystals that catch the light beautifully, adding a touch of sophistication to any outfit.
          </p>

          <h4 className="time-left font-heading text-3xl md:text-2xl lg:text-4xl  tracking-wide my-6">
            06d : 14h : 11m : 49s
          </h4>
           
            <div className="wrapper w-full flex justify-between items-center">

              <div className="coupon-wrapper w-[180px] h-[92px] relative">

                <div className="img-cont w-[inherit] h-[inherit] absolute inset-0">
                  <Image
                    fill
                    src={`${secAssetsDir}/coupon-layout.png`}
                    alt="coupon-layout"
                  />
                </div>

                <div className="coupon relative flex items-center mt-4 ">
                  <div className="brand-name ms-2 md:ms-1 lg:ms-2 me-7 -rotate-90 text-3xs uppercase font-semibold">
                    Jiaara
                  </div>
                  <div className="wrapper text-start">
                    <div className="font-content text-sm lg:text-md font-semibold tracking-wide">
                      Buy 1 Get 1
                    </div>
                    <div className="font-content lg:text-xs">
                      Use Code
                    </div>
                    <div className="font-content text-xs lg:text-sm font-semibold">
                      ELIN2024
                    </div>
                  </div>
                </div>
              </div>

              <Link
                className="shop-now-btn lg:px-3 md:px-2 py-2 text-md bg-black text-white 2xs:px-4 "
                href={SHOP?.pathname}
              >
                Shop Now
              </Link>
            </div>

            <p className="deal-disclaimer mt-2 text-sm font-content tracking-wide">
              Limited time offer.
              The deal will expire on <b>December 31, 2024.</b>
              Hurry Up!
            </p>
        </div>
      </div>
    </section>
  );
}
