import { PaginationItem, PaginationLink } from "@/components/ui/pagination";

const ArrayFromTo = (f = 1, t = 9) =>
  Array(t - f + 1)
    .fill(f)
    .map((n, i) => (n + i) as number);

const PaginationItems = ({
  from,
  to,
  current = 1,
  createNewUrl,
}: {
  from: number;
  to: number;
  current: number;
  createNewUrl: (
    page: number,
  ) => __next_route_internal_types__.RouteImpl<string>;
}) => {
  const pages = ArrayFromTo(from, to);
  return (
    <>
      {pages.map((index) => (
        <PaginationItem key={index}>
          <PaginationLink
            href={createNewUrl(index)}
            isActive={index === current}
          >
            {index}
          </PaginationLink>
        </PaginationItem>
      ))}
    </>
  );
};

export default PaginationItems;
