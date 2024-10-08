import React from "react";
import { useNavigation } from "../hooks";
import { useGlobalStore } from "../stores/globalStore";

export const PaginationBlock: React.FC<{ className?: string }> = ({
  className,
}) => {
  const setFilters = useGlobalStore((state) => state.setFilters);
  const { setUSParam } = useNavigation();
  const navAction = (path: string, value: string) => {

    
    setUSParam(path, value);
    setFilters({ [path]: value });
  };
  return (
    <div className={`${className}`}>
      <div className={`join`}>
        <button
          onClick={() => navAction("documents.where.page", "1")}
          className="join-item btn"
        >
          1
        </button>
        <button
          onClick={() => navAction("documents.where.page", "2")}
          className="join-item btn"
        >
          2
        </button>
        <button className="join-item btn btn-disabled">...</button>
        <button
          onClick={() => navAction("documents.where.page", "10")}
          className="join-item btn"
        >
          10
        </button>
        <button
          onClick={() => navAction("documents.where.page", "11")}
          className="join-item btn"
        >
          11
        </button>
      </div>
    </div>
  );
};

export default PaginationBlock;
