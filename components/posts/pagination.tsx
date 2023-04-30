import { usePagination, DOTS } from "hooks/usePagination";
import { useState } from "react";
import classNames from "classnames";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface Props {
  total: number;
  pages: number;
  siblings?: number;
  className: string;
  handelChange: CallableFunction;
}

export default function Pagination({
  total,
  pages,
  className = "",
  handelChange,
}: Props) {
  const router = useRouter();

  const [current, setCurrent] = useState<number>(1);
  const [page, setPage] = useState<number>(
    router.query.page !== undefined ? parseInt(router.query.page as string) : 1
  );
  const paginationRange = usePagination(total, pages, 1, current);

  useEffect(() => {
    if (current !== page) {
      setCurrent(page);
    }
  }, []);

  const onPageChanged = (page: number) => {
    setPage(page);
    setCurrent(page);
    router.query.page = page.toString();
    console.log("page:", page, router);
    router.push({
      pathname: router.route,
      query: router.query,
    });
    handelChange(page);
  };

  const onNext = () => {
    onPageChanged(current + 1);
  };

  const onPrevious = () => {
    onPageChanged(current - 1);
  };

  if (pages <= 1) {
    return null;
  }

  return (
    <div className={`pagination py-10 flex justify-center ${className}`}>
      <div className="btn-group">
        <button
          onClick={onPrevious}
          className={classNames("btn px-2.5  lg:px-4", {
            "btn-disabled": current === 1,
          })}
        >
          «
        </button>

        {paginationRange.map((pageNumber, key) => {
          if (pageNumber === DOTS) {
            return (
              <button key={key} className="btn px-2.5  lg:px-4 btn-disabled">
                &#8230;
              </button>
            );
          }

          return (
            <button
              key={key}
              className={classNames("btn px-2.5 lg:px-4", {
                "btn-active": pageNumber === current,
              })}
              onClick={() => onPageChanged(pageNumber as number)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={onNext}
          className={classNames("btn px-2.5  lg:px-4", {
            "btn-disabled": current === pages,
          })}
        >
          »
        </button>
      </div>
    </div>
  );
}
