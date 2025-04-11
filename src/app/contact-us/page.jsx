import ContactDetails from "@/components/pages/contact-us/ContactDetails";
import ContactForm from "@/components/pages/contact-us/ContactForm";


export default function ContactUs() {

  return (
    <div className="contact-us-page no-pb md:flex mx-[10vw] my-[15vh] items-start">
      <ContactDetails
        className={`
          contact-details
          flex items-center
          md:w-1/2
          relative
          drop-shadow-lg
          h-[685px]
        `}
      />
      <ContactForm
        className={`
          contact-us-form
          px-[6vw] py-10
        bg-white text-black
          md:w-1/2 md:px-[5vw]
          lg:rounded-tr-2xl
          lg:rounded-br-2xl
          drop-shadow-md
        `}
      />
    </div>
  );
}
