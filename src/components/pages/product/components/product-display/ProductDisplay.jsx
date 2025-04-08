'use client';

import ProductShowcase from "./components/ProductShowcase";
import ProductOverview from "./components/ProductOverview";
import ProductDetailsAccordionGroup from "./components/product-details-accordion-group/ProductDetailsAccordionGroup";


export default function ProductDisplay({ product = null }) {
  const creatNewObj = (data) => {
    const reqObj = {

      "user_id": '',
      "cart_id": '',
      "created_date": '',
      "product_id": data?.id,
      "quantity": 0,
      "img": data?.image,
      "price": data?.price,
      "name": data?.name,
      "status": 's'

    }
    return reqObj
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
