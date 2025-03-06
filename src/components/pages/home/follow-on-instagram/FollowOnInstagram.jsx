'use client';
import Image from 'next/image';

const images = [
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
  'https://cms.jiaarajewellery.com/wp-content/uploads/2024/11/Necklaces.webp',
];

export default function FollowOnInstagram() {
  
  return (
    <section id="follow-on-instagram" className="flex flex-col items-center justify-center gap-7">
      <h2 className="font-heading text-center text-4xl uppercase text-primaryFont leading-10">
        <span className="text-3xl">Follow Us On</span><br /> Instagram
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div key={index} className="p-2">
            <Image
              src={img}
              alt={`Instagram image ${index + 1}`}
              width={300}
              height={300}
              className="shadow-md object-cover w-full h-[300px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
