import { usePagination, DOTS } from "hooks/usePagination";
import { useState } from "react";
import classNames from "classnames";

interface Props {
  total: number;
  pages: number;
  siblings: number;
  className: string;
}

export default function Pagination({
  total,
  pages,
  siblings = 0,
  className = "",
}: Props) {
  if (pages <= 1) {
    return "";
  }
  const [current, setCurrent] = useState<number>(1);
  const paginationRange = usePagination(total, pages, 1, current);

  const onPageChanged = (page: number) => setCurrent(page);

  const onNext = () => {
    onPageChanged(current + 1);
  };

  const onPrevious = () => {
    onPageChanged(current - 1);
  };

  return (
    <div className={`pagination py-10 flex justify-center ${className}`}>
      <div className="btn-group">
        <button
          onClick={onPrevious}
          className={classNames("btn", { "btn-disabled": current === 1 })}
        >
          «
        </button>

        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <button className="btn btn-disabled">&#8230;</button>;
          }

          return (
            <button
              className={classNames("btn", {
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
          className={classNames("btn", { "btn-disabled": current === pages })}
        >
          »
        </button>
      </div>
    </div>
  );
}
