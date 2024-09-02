import { Link } from "react-router-dom";
import { ModelSingular } from "../../../models_EXPORT/models";

export const ContextModels = () => (
    <ul className="p-4 bg-base-200 capitalize">
    {Object.keys(ModelSingular).map((item, index) => (
      <li key={index}>
        <Link to={`/dashboard/pl/${item}`} replace>{item}</Link>
      </li>
    ))}
  </ul>
);
