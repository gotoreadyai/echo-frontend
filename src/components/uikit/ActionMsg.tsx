
import { FiCheckCircle, FiLoader } from "react-icons/fi";
import { notifyColor } from "../../utils/display";


const ActionMsg: React.FC<{children: React.ReactNode,  type: string }> = ({ type ,children}) => {
  return (
    <p className={`${notifyColor(type)} select-none bg-opacity-10 rounded-md transition-opacity animate-init-pulse container mx-auto  p-sm px-md flex gap-xs items-center`}>
      {type === "success" && <FiCheckCircle className="bg-success p-px rounded-full text-neutral-content" />}
      {type === "info" && <FiLoader className="bg-info p-px rounded-full  animate-spin" />}
      {children}
    </p>
  );
};

export default ActionMsg;

