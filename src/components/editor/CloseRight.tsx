/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Import the useTheme hook

const CloseRight = ({ callback, label }: any) => {
  const navigate = useNavigate();
  const handleDeselectBlock = () => {
    callback();
    const params = new URLSearchParams(location.search);
    params.delete("rightbar");

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  return (
    <div className="sticky top-0 flex bg-base-100 items-center justify-between border-b border-base-300 px-md py-sm">
      <button
        className="btn btn-circle btn-outline btn-xs"
        onClick={handleDeselectBlock}
      >
        <FiX />
      </button>
      <h3 className="text-2xl font-extrabold drop-shadow-sm text-warning">
        {label}
      </h3>
    </div>
  );
};
export default CloseRight;
