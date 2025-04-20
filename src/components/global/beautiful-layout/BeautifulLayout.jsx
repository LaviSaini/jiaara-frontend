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
<<<<<<< Updated upstream
      <div className="w-full px-5 mx-auto sm:px-7 md:px-10 lg:px-16">
<<<<<<< HEAD
        <BeautifulGrid items={items} />
=======
        <BeautifulGrid items={items}/>
=======
      <div className="pt-6">
        <BeautifulGrid items={items} />
>>>>>>> Stashed changes
>>>>>>> fda61b386e422575ff40369f0ed0d948c0ba3cf4
      </div>
    </div>
  );
}