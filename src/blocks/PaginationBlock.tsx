import React, { useEffect, useRef } from "react";
import { useNavigation } from "../hooks";
import { useGlobalStore } from "../stores/globalStore";
import { getGetterByPath, usePageStore } from "../stores/pageStore";

interface Option {
  currentPage: number;
  totalPages: number;
}

export const PaginationBlock: React.FC<{
  className?: string;
  filterName: string;
  scope?: string;
}> = ({ className, filterName, scope }) => {
  const setFilters = useGlobalStore((state) => state.setFilters);
  const { setUSParam } = useNavigation();
  const filters = useGlobalStore((state) => state.filters);
  const navAction = (path: string, value: string) => {
    setUSParam(path, value);
    setFilters({ [path]: value });
  };

  const scopeData: Option = usePageStore(
    (state) => (scope ? getGetterByPath(scope)(state.pageData) : {}) || {}
  );

  const { currentPage, totalPages } = scopeData;

  const previousTotalPages = useRef(totalPages);

  useEffect(() => {
    if (previousTotalPages.current !== totalPages) {
      setUSParam(filterName, "1");
      setFilters({ [filterName]: 1 });
      previousTotalPages.current = totalPages;
    }
  }, [totalPages]);

  if (totalPages <= 1) {
    return <div className="px-md pb-md">_</div>;
  }

  return (
    <div className={`${className} `}>
      <div className={`join`}>
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isSelected = pageNumber === currentPage;
          return (
            <button
              key={pageNumber}
              onClick={() => navAction(filterName, pageNumber.toString())}
              className={`join-item btn ${isSelected ? "btn-active" : ""}`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaginationBlock;
