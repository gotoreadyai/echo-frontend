import React from "react";
import { Link } from "react-router-dom";
import { usePageStore } from "../stores/pageStore";
import { parseKeyFromPath } from "../hooks/useNavigation";

export const LinkBlock: React.FC<{
  name: string;
  to: string;
  className?: string;
}> = ({ name, to, className }) => {
  const filters = usePageStore((state) => state.pageData?.filters);
  
  return (
    <div className="container mx-auto">
      <Link to={parseKeyFromPath(to,filters)} className={`${className || "text-info "} w-full block`}>
        {name || "Link"}
      </Link>
    </div>
  );
};

export default LinkBlock;
/* text-right */