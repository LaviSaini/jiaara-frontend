import ManageShop from "@/components/pages/shop/ManageShop";
import { useSelector } from "react-redux";


export default function Category({ params }) {

  return (
    <>
      <ManageShop data={null} className="category-page" params={params} otherClasses="flex flex-wrap" />
    </>
  );
}