/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import ActionMsg from "../components/uikit/ActionMsg";
import { getGetterByPath, usePageStore } from "../stores/pageStore";
import { ModelSingular } from "../../models_EXPORT/models";
import useNav from "../hooks/useNav";

const FilterScopeByIdAction: React.FC = ({ scope, onActionResult }: any) => {
  const { getUSParam } = useNav();
  const data =
    usePageStore((state) => getGetterByPath(scope)(state.pageData)) || [];
  const updateField = usePageStore((state) => state.updateField);

  const handleAction = async () => {
    const singular = ModelSingular[scope.split(".")[0]] || "";
    updateField(
      singular,
      Array.isArray(data) &&
        data.find((x) => x.id === getUSParam(`id` || ""))
    );
    onActionResult(true);
  };

  useEffect(() => {
    handleAction();
  }, []);

  return <ActionMsg type="info">RUN: Filtered by id: {scope}</ActionMsg>;
};
export default FilterScopeByIdAction;
