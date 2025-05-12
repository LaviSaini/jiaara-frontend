import ManageShop from "@/components/pages/shop/ManageShop";


export default function Collection({ params }) {

  return (
    <ManageShop data={[]} className="collection-page" params={params} otherClasses="flex flex-wrap" />
  );
}
