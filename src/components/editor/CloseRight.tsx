import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface CloseRightProps {
  callback: () => void;
  label: string;
}

const CloseRight: React.FC<CloseRightProps> = ({ callback, label }) => {
  const navigate = useNavigate();

  const handleDeselectBlock = () => {
    callback();
    const params = new URLSearchParams(window.location.search);
    params.delete("rightbar");

    navigate({
      pathname: window.location.pathname,
      search: params.toString(),
    });
  };

  return (
    <div className="sticky top-0 flex bg-base-100 items-center justify-between border-b border-base-300 px-md py-sm">
      <button
        className="btn btn-circle btn-outline btn-xs"
        onClick={handleDeselectBlock}
        aria-label="Zamknij"
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
