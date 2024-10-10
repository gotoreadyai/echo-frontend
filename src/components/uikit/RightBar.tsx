import { ReactNode } from "react";

const RightBar: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="fixed right-0 top-0 w-1/4 h-full bg-base-100 z-50 border-l border-base-300 overflow-y-auto">
      {children}
    </div>
  );
};

export default RightBar;
