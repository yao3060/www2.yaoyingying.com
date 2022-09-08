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
      alt={title}
      src={url}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );

  return (
    <div className="w-[300px] h-[150px]">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
