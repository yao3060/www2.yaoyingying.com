import React, { useMemo } from "react";
export const DOTS = "...";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  /**
   * Create an array of certain length and set the elements within it from
   * start value to end value.
   */
  return Array.from({ length }, (_, idx) => idx + start);
};

// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
// setting the `defaultValue` of our `siblings` prop to be 1 as it is an optional prop
export const usePagination = (
  total: number,
  pages = 10,
  siblings = 1,
  current: number
) => {
  // Using the useMemo hook to compute core logic.
  // The useMemo callback will run when any value in its dependency array changes.
  const paginationRange = useMemo(() => {
    // Pages count is determined as siblings + firstPage + lastPage + current + 2*DOTS
    const totalPageNumbers = siblings + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..pages]
    */
    if (totalPageNumbers >= pages) {
      return range(1, pages);
    }

    // Calculate left and right sibling index and
    // make sure they are within range 1 and `pages`
    const leftSiblingIndex = Math.max(current - siblings, 1);
    const rightSiblingIndex = Math.min(current + siblings, pages);

    /**
     * We do not show dots just when there is just one page number
     * to be inserted between the extremes of sibling and the page limits
     * i.e 1 and pages.
     * Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < pages - 2
     */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = pages;

    /**
     * Case 2: No left dots to show, but rights dots to be shown
     */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblings;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, pages];
    }

    /**
     * Case 3: No right dots to show, but left dots to be shown
     */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblings;
      let rightRange = range(pages - rightItemCount + 1, pages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /**
     * Case 4: Both left and right dots to be shown
     */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [total, pages, siblings, current]);
  return paginationRange;
};
