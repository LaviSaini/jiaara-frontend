'use client';

import BeautifulGrid from "@/components/global/beautiful-layout/components/BeautifulGrid";


export default function BeautifulLayout({
  className = "",
  items = {
    itemsArr: [],
    urlsArr: []
  }
}) {

  return (
    <div className={`${className} beautiful-layout`}>
      <div className="w-full px-0 mx-auto">
        <BeautifulGrid items={items} />
      </div>
    </div>
  );
}