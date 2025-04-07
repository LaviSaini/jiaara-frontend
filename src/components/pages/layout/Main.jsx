// import { useEffect } from "react";

import Loader from "@/components/model/Loader";
import { loaderData } from "@/redux/slices/loader";
import { useDispatch } from "react-redux";

export default function Main({ childComponents = <></> }) {
  return (
    <main className="bg-primaryBackground">
      {childComponents}
      <Loader></Loader>
    </main>
  );
}
