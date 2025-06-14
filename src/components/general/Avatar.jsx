import Image from "next/image";

const Avatar = ({ className = "avatar", src, alt, onClick}) => {

  return (
    <div
      className={`relative ${className}`}
      onClick={onClick}
    >
      <Image
        className="size-full object-cover object-center rounded-[50%]"
        fill
        src={src}
        alt={alt}
        quality={80}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

export default Avatar;