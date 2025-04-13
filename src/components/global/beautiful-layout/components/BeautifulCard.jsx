'use client';

import Link from "next/link";
import Image from "next/image";


export default function BeautifulCard({ className = "", item = null, url = "" }) {

  return (
    <div className={`${className} relative`}>
      <div className={`
        img-cont relative
        w-full h-[50vw]
        sm:h-[40vw]
        md:h-[35vw]
        lg:h-[30vw]
        xl:h-[25vw]
      `}>
        <Image
          className="object-cover object-center rounded-3xl"
          fill
          src={item?.image}
          alt={item?.slug}
        />
      </div>

      {(item?.name || item?.count || url) &&
        <div
          className={`
            w-full flex justify-between items-center gap-2 px-3 py-3
            absolute left-0 bottom-0
            text-xs font-semibold
            tracking-wider text-white
            sm:text-sm
            md:text-base
            beautifulCard
          `}
        >
          {(item?.name || item?.count) &&
            <div className="wrapper flex flex-col gap-1 z-10 uppercase justify-between">
              {item?.name &&
                <div className="name">
                  {item?.name}
                </div>
              }
              {item?.count &&
                <div
                  className={`
                    products-count
                    text-xs
                  `}
                >
                  {`${item?.count} Products`}
                </div>
              }
            </div>
          }
           
          {url &&
          <div>
            <Link
              className="url border py-2 px-5 z-10 rounded-full uppercase tracking-wider font-content text-xs"
              href={url}
            >
              Shop Now
            </Link>
            </div>
          }
        </div>
      }
    </div>
  );
}