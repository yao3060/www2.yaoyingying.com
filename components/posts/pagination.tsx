import { usePagination, DOTS } from "hooks/usePagination";
import { useState } from "react";
import classNames from "classnames";
import { useQueryParam, NumberParam, withDefault } from "use-query-params";
import { useEffectOnce } from "react-use";

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
  const [current, setCurrent] = useState<number>(1);
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const paginationRange = usePagination(total, pages, 1, current);

  useEffectOnce(() => {
    if (current !== page) {
      setCurrent(page);
    }
  });

  const onPageChanged = (page: number) => {
    setPage(page);
    setCurrent(page);
    handelChange(page);
  };

  const onNext = () => {
    onPageChanged(current + 1);
  };

  const onPrevious = () => {
    onPageChanged(current - 1);
  };

  if (pages <= 1) {
    return <></>;
  }

  return (
    <div className={`pagination py-10 flex justify-center ${className}`}>
      <div className="btn-group">
        <button
          onClick={onPrevious}
          className={classNames("btn", { "btn-disabled": current === 1 })}
        >
          «
        </button>

        {paginationRange.map((pageNumber, key) => {
          if (pageNumber === DOTS) {
            return (
              <button key={key} className="btn btn-disabled">
                &#8230;
              </button>
            );
          }

          return (
            <button
              key={key}
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
