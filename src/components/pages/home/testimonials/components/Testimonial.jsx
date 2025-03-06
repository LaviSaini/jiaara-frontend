import Avatar from "@/components/general/Avatar";
import Icon from "@/components/general/Icon";
import Rating from "@/components/general/Rating";

import useWindowSize from "@/utils/hooks/general/useWindowSize";

const iconsDir = "/assets/icons";


export default function Testimonial({ testimonial }) {

  const { screenWidth, breakpoints: { sm } } = useWindowSize();

  return (
    <>
      {/* Mobile Screens */}
      {screenWidth < sm &&
        <div className={`
          testimonial-${testimonial.id}
          w-full
          flex flex-col gap-3 border-l-8 px-5 py-3
          rounded-lg shadow-md
          bg-quinaryBackground border-l-senaryBackground shadow-gray-400
        `}>
          <div className="wrapper w-full flex justify-between items-center">

            <div className="avatar-cont flex items-center gap-5">
              <Avatar
                className="avatar size-[50px] sm:size-[115px]"
                src={testimonial.avatar.profilePic}
                alt={testimonial.avatar.name}
              />

              <div className="avatar-content flex flex-col justify-center">
                <div className="name text-sm font-semibold text-primaryFont">
                  {testimonial.avatar.name}
                </div>

                <Rating
                  given={testimonial.rating}
                  iconClassName="relative size-[15px]"
                  activeIcon={`${iconsDir}/star-fill.png`}
                  inactiveIcon={`${iconsDir}/star-outline.png`}
                />
              </div>
            </div>

            <Icon
              className="size-[50px] relative"
              icon={`${iconsDir}/quote.png`}
              alt="quote-icon"
            />
          </div>

          <div className="text text-xs overflow-y-auto text-primaryFont">
            {testimonial.text}
          </div>
        </div>
      }

      {/* Tablet, Laptop and Desktop Screens */}
      {screenWidth >= sm &&
        <div className={`
          testimonial-${testimonial.id}
          w-full
          flex items-center gap-8 border-l-8 px-5 py-3
          rounded-lg shadow-md
          bg-quinaryBackground border-l-senaryBackground shadow-gray-400
        `}>

          <div className="avatar-cont">
            <Avatar
              className="avatar size-[115px]"
              src={testimonial.avatar.profilePic}
              alt={testimonial.avatar.name}
            />
          </div>

          <div className="content relative flex flex-col items-center justify-center gap-3">

            <Icon
              className="size-[50px] absolute top-[10%] right-0 -translate-y-1/2"
              icon={`${iconsDir}/quote.png`}
              alt="quote-icon"
            />

            <div className="wrapper w-full flex items-center gap-5">
              <div className="name text-sm font-semibold text-primaryFont">
                {testimonial.avatar.name}
              </div>

              <Rating
                given={testimonial.rating}
                iconClassName="relative size-[15px]"
                activeIcon={`${iconsDir}/star-fill.png`}
                inactiveIcon={`${iconsDir}/star-outline.png`}
              />
            </div>

            <div className="text text-xs overflow-y-auto text-primaryFont">
              {testimonial.text}
            </div>
          </div>
        </div>
      }
    </>
  );
}
