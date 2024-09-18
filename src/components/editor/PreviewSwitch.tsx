import {
  FiDatabase,
  FiEye,
  FiFile,
  FiLayout,
  FiSidebar,
  FiSquare,
} from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PathParams } from "../../types/types";

const PreviewSwitch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workspace, slug, action } = useParams<PathParams>();

  // Determine if the current path matches specific modes
  const isPreviewMode = location.pathname.endsWith(`/${workspace}/${slug}/`);

  return (
    <>
      <div className="tooltip tooltip-bottom tooltip-accent" data-tip="[Tab] Preview">
        <button
          aria-label="Tab"
          className={`btn btn-sm btn-square ${
            isPreviewMode ? "btn-active" : ""
          }`}
          onClick={() => navigate(`/${workspace}/${slug}/`)}
        >
          <FiEye />
        </button>
      </div>
      <div className="tooltip tooltip-bottom tooltip-accent" data-tip="[Tab] Document edit">
        <button
          aria-label="Tab"
          className={`btn btn-sm btn-square ${
            action === "edit-document" ? "btn-active" : ""
          }`}
          onClick={() => navigate(`/${workspace}/${slug}/edit-document/`)}
        >
          <FiFile />
        </button>
      </div>
      <button
        aria-label="Tab"
        className={`btn btn-sm btn-square ${
          action === "edit-side" ? "btn-active" : ""
        }`}
        onClick={() => navigate(`/${workspace}/${slug}/edit-side/`)}
      >
        <FiSidebar />
      </button>
      <button
        aria-label="Tab"
        className={`btn btn-sm btn-square ${
          action === "edit-workspace" ? "btn-active" : ""
        }`}
        onClick={() => navigate(`/${workspace}/${slug}/edit-workspace/`)}
      >
        <FiLayout />
      </button>

      <button
        aria-label="Tab"
        className={`btn btn-sm btn-square ${
          action === "edit-modal" ? "btn-active" : ""
        }`}
        onClick={() => navigate(`/${workspace}/${slug}/edit-modal/`)}
      >
        <FiSquare />
      </button>

      <button
        aria-label="Tab"
        className={`btn btn-sm btn-square ${
          action === "edit-scope" ? "btn-active" : ""
        }`}
        onClick={() => navigate(`/${workspace}/${slug}/edit-scope/`)}
      >
        <FiDatabase />
      </button>
    </>
  );
};

export default PreviewSwitch;
