import Icon from "@/components/general/Icon";


export default function Benefit({ className, icon, heading, text }) {

  return (
    <div className={`
      benefit
      w-full
      flex justify-center items-center gap-4 p-4
      text-white
      sm:w-1/2
      lg:w-fit
      ${className}
    `}>
      <Icon className="text-3xl" icon={icon}/>
      <div className="content flex flex-col gap-1">
        <div className="heading text-2xl text-center capetillize font-heading">
          {heading}
        </div>
        <div className="text-center text-sm font-content tracking-wide">
          {text}
        </div>  
      </div>
    </div>
  );
}
