import Image from 'next/image';

type props = { src: string; alt: string };

export default function IntroImage({ src, alt }: props) {
  return (
    <div className="relative max-w-[400px] w-full mx-auto">
      <div className="relative  pb-[62.5%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1000px) 400px, 200px"
        />
      </div>
    </div>
  );
}
