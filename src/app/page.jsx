import Hero from "@/components/pages/home/Hero";
import Categories from "@/components/pages/home/Categories";
import FeaturedProducts from "@/components/pages/home/featured-products/FeaturedProducts";
import CelebrityStyle from "@/components/pages/home/CelebrityStyle";
import Collections from "@/components/pages/home/Collections";
import KeyBenefits from "@/components/global/key-benefits/KeyBenefits";
import BuildingWithPurpose from "@/components/pages/home/BuildingWithPurpose";
import Testimonials from "@/components/pages/home/testimonials/Testimonials";
import Sale from "@/components/pages/home/sale/Sale";
import FollowOnInstagram from "@/components/pages/home/follow-on-instagram/FollowOnInstagram";
import FeaturedDeals from "@/components/pages/home/featured-deals/FeaturedDeals";
import JiaaraStory from "@/components/pages/home/JiaaraStory";
import SendGift from "@/components/pages/home/SendGift";
import FilterBar from "@/components/global/filter/FilterBar";


export default function Home() {

  return (
    <div className="homepage flex flex-col relative lg:top-[100px]">

      <Hero/>
      {/* <FilterBar/> */}
      <Categories/>
      <FeaturedProducts/>
      <FeaturedDeals/>
      <Sale/>
      <KeyBenefits/>
      <CelebrityStyle/>
      {/* <JiaaraStory/> */}
      <Collections/>
      <SendGift/>
      <BuildingWithPurpose/>
      <FollowOnInstagram/>
      <Testimonials/>
    </div>
  );
}