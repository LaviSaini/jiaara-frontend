import Image from "next/image";

const assetsDirPath = "/assets/pages/homepage/celebrities";

const celebrities = [
  {
    id: 1,
    image: `${assetsDirPath}/1.jpg`
  },
  {
    id: 2,
    image: `${assetsDirPath}/2.jpg`
  },
  {
    id: 3,
    image: `${assetsDirPath}/3.jpg`
  },
  {
    id: 4,
    image: `${assetsDirPath}/4.jpg`
  },
  {
    id: 5,
    image: `${assetsDirPath}/5.jpg`
  },
  {
    id: 6,
    image: `${assetsDirPath}/6.jpg`
  },
  {
    id: 7,
    image: `${assetsDirPath}/7.jpg`
  },
  {
    id: 8,
    image: `${assetsDirPath}/8.jpg`
  }
];

export default function CelebrityStyle() {
  return (
    <section id="celebrity-style" className="flex flex-col items-center justify-center">
      <h2 className="font-heading text-center text-3xl lg:text-4xl capitalize text-primaryFont my-8 lg:my-10">
        Celebrity Style
      </h2>

      <div className="celebrities flex flex-wrap justify-center items-center px-5">
        {celebrities.map(celebrity => 
          <div
            key={celebrity?.id}
            className={`
              img-cont
              relative
              w-[43vw] h-[53vw]
              border-2 border-white
              sm:w-[32vw] sm:h-[42vw]
              lg:w-[25vw] lg:h-[35vw]
              xl:w-[21vw] xl:h-[31vw]
            `}>
            <Image
              className="object-cover object-center"
              fill
              src={celebrity?.image}
              alt={celebrity?.id}
              quality={80}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
         </div>
        )}
      </div>
    </section>
  );
}
