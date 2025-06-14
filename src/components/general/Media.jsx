import Image from 'next/image';

const mimeTypes = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogg: 'video/ogg',
  ogv: 'video/ogg',
  mov: 'video/quicktime',
  avi: 'video/x-msvideo',
  mkv: 'video/x-matroska',
  flv: 'video/x-flv'
};

const getMimeType = src => {
  const extension = src.split('.').pop();
  return mimeTypes[extension] || '';
};

const isVideo = src => src.match(/\.(mp4|webm|ogg|ogv|mov|avi|mkv|flv)$/i);

const Media = ({ 
  src = "",
  alt = "",
  imgContClassName = "",
  imgClassName = "",
  videoClassName = "",
  videoMuted = true,
  videoAutoPlay = true,
  videoLoop = true,
  type = ""
}) => {

  if (isVideo(src)) {
    return (
      <video
        className={`${videoClassName} max-w-[unset]`}
        muted={videoMuted} 
        autoPlay={videoAutoPlay} 
        loop={videoLoop}
      >
        <source src={src} type={getMimeType(src)}/>
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <div className={`img-cont ${imgContClassName}`}>
      <Image
        fill 
        className={imgClassName} 
        src={src} 
        alt={alt || "media"}
        quality={80}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={type === 'hero'}
      />
    </div>
  );
};

export default Media;