import { usePageStore, getGetterByPath } from "../stores/pageStore";

import useNav from "../hooks/useNav";

interface Option {
  currentPage: number;
  totalPages: number;
}

const PaginationBlock: React.FC<{
  className?: string;
  filterName: string;
  scope?: string;
}> = ({ className, filterName, scope }) => {
  const { navigateTo, getUSParam } = useNav();
  const currentPage = Number(getUSParam(filterName)) || 1;

  const scopeData: Option | undefined = usePageStore((state) =>
    scope ? getGetterByPath(scope)(state.pageData) : undefined
  );

  const totalPages = scopeData?.totalPages || 1;

  if (totalPages <= 1) {
    return null; // Ukrywanie paginacji, gdy jest tylko 1 strona
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
              onClick={() =>
                navigateTo(window.location.pathname, {
                  queryParams: { [filterName]: pageNumber.toString() },
                })
              }
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
