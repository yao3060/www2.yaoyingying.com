"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname } from "next/navigation";
import PaginationItems from "./PaginationItems";
import { useCallback } from "react";
import clsx from "clsx";

type MyPagination = {
  pages: number;
  currentPage: number;
  className?: string;
};

/**
 * @example
 *    <Suspense>
 *       <MyPagination className="py-4" pages={10} currentPage={1}/>
 *    </Suspense>
 *
 * @param param0
 * @returns
 */
function MyPagination({ pages, currentPage, className }: MyPagination) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  }, []);

  const createNewUrl = useCallback((p: number) => {
    return `${pathname}?${createQueryString("page", p.toString())}` as __next_route_internal_types__.RouteImpl<string>;
  }, []);

  return (
    <Pagination className={`${className}`}>
      <PaginationContent>
        {
          // pages < 5
          pages <= 10 ? (
            <PaginationItems
              from={1}
              to={pages}
              current={currentPage}
              createNewUrl={createNewUrl}
            />
          ) : (
            <>
              <PaginationItem>
                <PaginationPrevious
                  inert={currentPage <= 1}
                  className={clsx({
                    "pointer-events-none": currentPage <= 1,
                  })}
                  href={createNewUrl(currentPage - 1)}
                />
              </PaginationItem>

              <PaginationItems
                from={1}
                to={3}
                current={currentPage}
                createNewUrl={createNewUrl}
              />

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItems
                from={pages - 2}
                to={pages}
                current={currentPage}
                createNewUrl={createNewUrl}
              />

              <PaginationItem>
                <PaginationNext
                  inert={currentPage >= pages}
                  className={clsx({
                    "pointer-events-none": currentPage >= pages,
                  })}
                  href={createNewUrl(currentPage + 1)}
                />
              </PaginationItem>
            </>
          )
        }
      </PaginationContent>
    </Pagination>
  );
}

export default MyPagination;
