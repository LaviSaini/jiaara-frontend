import ManageShop from "@/components/pages/shop/ManageShop";
import { useSelector } from "react-redux";


export default function Category({ params }) {

  return (
    <>
      <h1>h</h1>
      <ManageShop className="category-page" params={params} />
    </>
  );
}