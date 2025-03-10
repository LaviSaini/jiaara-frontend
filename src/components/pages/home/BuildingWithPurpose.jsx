import Image from "next/image";

import ContentOnBackground from "@/components/general/ContentOnBackground";


const dirAssets = "/assets/pages/homepage/purpose";


export default function BuildingWithPurpose() {

  return (
    <section id="building-with-purpose" className="flex flex-col items-center justify-center mx-[10vw] shadow-md">
      
      <div className="content-cont w-full flex flex-col md:flex-row">
        
      <div className="img-cont relative w-[inherit] h-[20rem] md:w-[50%] md:h-auto">
          <Image
            className="object-cover object-bottom"
            fill
            src={`${dirAssets}/preview-image.jpg`}
            alt="Hands-Craft Preview Image"
          />
        </div>
        <ContentOnBackground
          className="text-content relative md:w-[70%]"
          image={{
            src: `${dirAssets}/bg-wallpaper.png`,
            alt: "Hands-Craft Background Image"
          }}
          innerClassName="wrapper p-[5vw] text-primaryFont sm:gap-7"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-4xl sm:mb-6 md:mb-8 lg:mb-8">
            The Hands Behind the Craft
          </h2>
          <p className="font-content text-md leading-7 ">
            At the heart of our jewellery lies the skill and dedication of our artisans, the true artists behind each piece.
            With years of experience and a deep respect for traditional techniques, they meticulously craft every detail by hand, infusing their passion and expertise into every creation.
            Our artisans are more than just makers; they are custodians of age-old craftsmanship, preserving the heritage of jewelry-making while bringing their unique touch to each design.
            Their unwavering commitment to excellence ensures that every piece of jewelry is not only a beautiful adornment but a timeless work of art, rich with history and meaning.
          </p>
        </ContentOnBackground>

      </div>
    </section>
  );
}
