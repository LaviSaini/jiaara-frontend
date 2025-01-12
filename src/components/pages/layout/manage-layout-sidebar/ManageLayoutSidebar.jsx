'use client';

import LayoutSidebar from "@/components/pages/layout/manage-layout-sidebar/components/LayoutSidebar";

import useWindowSize from "@/utils/hooks/general/useWindowSize";
import { useEffect } from "react";


export default function ManageLayoutSidebar() {

  const { screenWidth, breakpoints: { lg } } = useWindowSize();
  useEffect(() => {
    console.log('manage')
  }, [])
  return (
    (screenWidth < lg &&
      <LayoutSidebar />
    )
  );
}
