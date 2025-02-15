import { useQuery } from "@tanstack/react-query";

import Validation from "@/components/general/Validation";
import ProductsCarousel from '@/components/global/ProductsCarousel';

import { getProductsByIds } from "@/utils/functions/api/cms/woocommerce/products";


export default function RelatedProducts({ className = "", cartItems = [] }) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchRelatedProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!cartItems?.length || !cartItems[0]?.relatedProductIds?.length) {
        throw new Error("No related product IDs found.");
      }

      // Construct query params dynamically
      const productIds = cartItems[0].relatedProductIds.map(id => `product_ids[]=${id}`).join("&");
      const url = `https://cms.jiaarajewellery.com/wp-json/wp/v2/getRelatedProduct?${productIds}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cartItems?.length) {
      fetchRelatedProducts();
    }
  }, [cartItems]);

  
  if (isLoading) {
    return (
      <Validation
        className="w-full h-[10rem] text-primaryFont"
        message="Loading Related Products…"
      />
    );
  }
  
  const { products } = data || [];

  return (
    (isSuccess &&
      <ProductsCarousel
        className={`related-products py-5 ${className}`}
        headingClassName="text-center text-2xl uppercase text-primaryFont"
        heading="Related Products"
        carousel={{ 
          isPlaying: true,
          interval: 3000
        }}
        sliderClassName="select-none cursor-grab active:cursor-grabbing"
        slideClassName="mx-[1.5vw]"
        slideInnerClassName="flex flex-col gap-3"
        data={{ products }}
      />
    )
  );
}