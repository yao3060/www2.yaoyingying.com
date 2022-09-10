/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

interface Props {
  title: string;
  url: string;
  slug?: string;
  width: number;
  height: number;
}

export default function ItemImage({ title, url, slug, width, height }: Props) {
  const image = (
    <img
      width={width}
      height={height}
      alt={title}
      src={url}
      className="overflow-hidden"
    />
  );

  return (
    <div
      className="w-[300px] h-[150px]"
      style={{
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a
            aria-label={title}
            className="block w-full h-full hover:shadow-inner"
          ></a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
