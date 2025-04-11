import ContentOnBackground from "@/components/general/ContentOnBackground";

import ContactLinks from "@/components/global/ContactLinks";


export default function ContactDetails({ className = "" }) {

  const assetsDirPath = `/assets/pages/contact-us`;

  return (
    <ContentOnBackground
  className={`${className} rounded-2xl overflow-hidden shadow-xl absolute -top-6 left-4 z-10`}
  image={{
    src: `${assetsDirPath}/contact-us-image.png`,
    alt: "contact-us-reference-image",
  }}
>
  <div className="contact-information-cont w-[73%] flex flex-col gap-8 relative px-[7vw] py-16 md:px-[5vw] lg:gap-8 text-white">
    

    <h1 className="heading text-3xl uppercase lg:text-4xl">
      Contact Us
    </h1>
    <div>
      <h2 className="text-lg font-medium uppercase mb-2">Address</h2>
      <h4 className="text-sm">Jiara Creations Private Limited</h4>
      <p className="text-xs leading-relaxed tracking-wide">
        1003, Bldg-6, Sandstone Society, Unique Garden, Kanakia Layout, Mira Road, Thane-East, Bhayander 401107
      </p>
    </div>
    <div>
      <h2 className="text-lg font-medium uppercase mb-2">Phone</h2>
      <p className="text-sm">+91 6396872895</p>
    </div>
    <div>
      <h2 className="text-lg font-medium uppercase mb-2">Email</h2>
      <p className="text-sm">jiaaracreations@gmail.com</p>
    </div>
    <div>
      <h2 className="text-sm font-medium uppercase mb-2">Social</h2>
      <div className="flex gap-4 items-center">
        {/* <img src="/instagram-icon.png" alt="Instagram" className="w-6 h-6" />
        <img src="/amazon-icon.png" alt="Amazon" className="w-6 h-6" /> */}
      </div>
    </div>
  </div>
</ContentOnBackground>
  );
}