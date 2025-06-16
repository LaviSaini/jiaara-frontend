import Image from "next/image";

const dirAssets = "/assets/pages/homepage/purpose";
export default function About() {

    return (
        <>
            <section id="building-with-purpose" className="no-pb px-10 py-16 md:px-[10vw] bg-gray-50 text-gray-900">
                <div className="flex flex-col items-center justify-center">
                    <div className="content-cont w-full flex flex-col md:flex-row gap-7">

                        <div className="img-cont relative w-[inherit] h-[20rem] md:w-[60%] md:h-auto">
                            <Image
                                className="object-cover object-center"
                                fill
                                src={`${dirAssets}/preview-image.jpg`}
                                alt="Hands-Craft Preview Image"
                            />
                        </div>
                        <div
                            className="text-content relative md:w-[80%]"
                            image={{
                                src: `${dirAssets}/bg-wallpaper.png`,
                                alt: "Hands-Craft Background Image"
                            }}
                            innerClassName="wrapper p-[5vw] text-primaryFont sm:gap-7"
                        >
                            <h2 className="font-heading text-3xl md:text-4xl lg:text-4xl sm:mb-6 md:mb-8 lg:mb-8">
                                About Us
                            </h2>
                            <p className="font-content text-md leading-7 ">
                                Jiaara infuses traditional essence into the modern aesthetic. The brand draws inspiration from age-old sensibilities where Jewellery can be a powerful way to communicate personal values and beliefs.
                            </p>
                            <br/>
                            <p className="font-content text-md leading-7 ">
                                Jiaara offers bold and statement-making designs to express a sense of confidence & individuality whereas, understated and classic designs to express a more reserved or timeless sense of style.
                            </p>
                           <br/>
                            <p className="font-content text-md leading-7 ">
                                It envisions to empower the artisans & embrace creativity. Embrace the charm of Jiaara and elevate your fashion game with its undeniable allure.
                            </p>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}