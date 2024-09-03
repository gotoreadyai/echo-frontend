import { Link, useParams } from "react-router-dom";
import { ModelSingular } from "../../../models_EXPORT/models";
import { CrudManagerParams } from "./Types";

export const ContextModels = () => {
  const { model } = useParams<CrudManagerParams>();
  return (
    <ul className="p-4 bg-base-200 capitalize">
      {Object.keys(ModelSingular).map((item, index) => (
        <li
          key={index}
          className={`${model === item && "bg-base-100 rounded-btn"}`}
        >
          <Link to={`/dashboard/pl/${item}`} replace>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
};
