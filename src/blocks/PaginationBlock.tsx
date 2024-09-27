import React from "react";
import { useNavigation } from "../hooks";


export const PaginationBlock: React.FC<{ className?: string }> = ({
  className,
}) => {

  const { setUSParam } = useNavigation();
  return (
    <div className={`${className}`}     >
      <div className={`join`}>
        <button onClick={()=> setUSParam("documents.where.page", '1')} className="join-item btn">
          1
        </button>
        <button onClick={()=> setUSParam("documents.where.page", '2')} className="join-item btn">
          2
        </button>
        <button className="join-item btn btn-disabled">...</button>
        <button onClick={()=> setUSParam("documents.where.page", '10')} className="join-item btn">
          10
        </button>
        <button onClick={()=> setUSParam("documents.where.page", '11')} className="join-item btn">
          11
        </button>
      </div>
    </div>
  );
};

export default PaginationBlock;
