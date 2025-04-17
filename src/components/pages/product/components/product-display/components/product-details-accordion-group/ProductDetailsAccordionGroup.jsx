import { FiMinus, FiPlus } from "react-icons/fi";

import Accordion from "@/components/general/Accordion";
import Specification from "./components/Specification";
import ProductDescription from "./components/ProductDescription";
import Icon from "@/components/general/Icon";


export default function ProductDetailsAccordionGroup({ className = "", product = null }) {

  const accordionsData = [
    {
      title: "Product Description",
      content: <ProductDescription product={product} />
    },
    {
      title: "Specifications",
      content: <Specification product={product} />
    }
  ];


  return (
    <>

      <div className={`wrapper pt-4 pb-5 bg-white ${className}`}>
        <div className="px-[5vw]">
          <div className="flex items-center mb-2">
            <div className="w-[30px] flex justify-center">
              <Icon icon={'/assets/icons/free-shipping.png'} className="relative mr-2 size-[15px] h-[25px] w-[25px]  " />
            </div>
            <div>
              <span>Free Shipping</span>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-[30px] flex justify-center">
              <Icon icon={'/assets/icons/checked.png'} className="relative mr-2 size-[15px]   " />
            </div>
            <div>
              <span>Easy 15 day Returns & Exchange</span>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-[30px] flex justify-center">
              <Icon icon={'/assets/icons/shield.png'} className="relative mr-2 size-[15px]   " />
            </div>
            <div>
              <span>One Year Repair Warranty</span>
            </div>
          </div>
        </div>
        <div className="product-details-accordion-group px-[5vw]">
          {accordionsData.map((accordionData, index) =>
            <Accordion
              key={index}
              className="border-primaryFont"
              title={accordionData.title}
              titleClassName="text-sm sm:text-base xl:text-lg"
              contentClassName="content"
              content={accordionData.content}
              divider={{
                upper: {
                  className: "border-1 py-2 border-primaryFont",
                  isEnabled: true
                },
                bottom: {
                  className: "border-1 py-2 border-primaryFont",
                  isEnabled: true
                }
              }}
              iconClassName="md:text-lg"
              openIcon={FiPlus}
              closeIcon={FiMinus}
              defaultState={false}
              unmountOnExit={true}
            />
          )}
        </div>
      </div>
    </>

  );
}
