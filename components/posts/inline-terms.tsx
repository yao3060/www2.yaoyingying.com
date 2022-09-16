import { Category } from "interfaces";
import last from "lodash/last";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  taxonomy: string;
  items?: Category[] | null;
}
export default function InlineTerms({ taxonomy, items }: Props) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      {items && items.length ? (
        <div className="child-categories">
          <span className="btn btn-xs pr-2.5">Categories:</span>
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`${(slug as string[]).join("/")}/${item.slug}`}
            >
              <a className="btn btn-xs btn-link mr-2.5">{item.name}</a>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
