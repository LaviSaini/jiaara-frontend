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
    <section id="celebrity-style" className="flex flex-col items-center justify-center gap-12">
      <h2 className="heading text-center px-5 text-4xl uppercase text-primaryFont">
        Celebrity Style
      </h2>

      <div className="celebrities flex flex-wrap justify-center items-center px-5">
        {celebrities.map(celebrity => 
          <div
            key={celebrity.id}
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
              src={celebrity.image}
              alt={celebrity.id}
            />
         </div>
        )}
      </div>
    </section>
  );
}
