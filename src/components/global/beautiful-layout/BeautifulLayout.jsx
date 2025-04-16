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
      <div className="w-full px-5 mx-auto sm:px-7 md:px-10 lg:px-16">
        <BeautifulGrid items={items} />
      </div>
    </div>
  );
}