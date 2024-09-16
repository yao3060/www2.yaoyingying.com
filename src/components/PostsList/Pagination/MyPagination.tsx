"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import PaginationItems from "./PaginationItems";

type MyPagination = {
  pages: number;
  className?: string;
};

/**
 * @example
 *    <Suspense>
 *       <MyPagination className="py-4" pages={10}  />
 *    </Suspense>
 *
 * @param param0
 * @returns
 */
function MyPagination({ pages, className }: MyPagination) {
  const params = useParams<{ id: string }>();
  console.log("MyPagination:params", params);
  const currentPage = Number(params.id) || 1;

  const createPageURL = useCallback((p: number | string) => {
    return `/page/${p}` as __next_route_internal_types__.RouteImpl<string>;
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
              createPageURL={createPageURL}
            />
          ) : (
            <>
              <PaginationItem>
                <PaginationPrevious
                  size="default"
                  className={clsx({
                    "pointer-events-none": currentPage <= 1,
                  })}
                  href={createPageURL(currentPage - 1)}
                />
              </PaginationItem>

              <PaginationItems
                from={1}
                to={3}
                current={currentPage}
                createPageURL={createPageURL}
              />

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItems
                from={pages - 2}
                to={pages}
                current={currentPage}
                createPageURL={createPageURL}
              />

              <PaginationItem>
                <PaginationNext
                  size="default"
                  className={clsx({
                    "pointer-events-none": currentPage >= pages,
                  })}
                  href={createPageURL(currentPage + 1)}
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
