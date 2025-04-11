'use client';

import ProductShowcase from "./components/ProductShowcase";
import ProductOverview from "./components/ProductOverview";
import ProductDetailsAccordionGroup from "./components/product-details-accordion-group/ProductDetailsAccordionGroup";
import createObjCommanFunction from "@/utils/functions/general/createCartWishlistObje";


export default function ProductDisplay({ product = null }) {
  const creatNewObj = (data) => {
    return createObjCommanFunction(data);
  }
  return (
    <section
      id="product-display"
      className="flex flex-col"
    >
      <div className="wrapper w-full flex flex-col px-[3vw] py-10 md:flex-row lg:px-[5vw] xl:py-16">
        <ProductShowcase product={product} />
        <ProductOverview product={product} cartProduct={creatNewObj(product)} />
      </div>
      <ProductDetailsAccordionGroup product={product} />
    </section>
  );
}
