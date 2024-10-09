import React, { useEffect } from "react";
import { fetchItems } from "../services/genericService";
import { ModelSingular } from "../../models_EXPORT/models";
import { useGlobalStore } from "../stores/globalStore";
import ActionMsg from "../components/uikit/ActionMsg";
import { usePageStore } from "../stores/pageStore";
import { FetchItemsActionProps } from "../types/types";


const FetchItemsAction: React.FC<FetchItemsActionProps> = ({
  scope,
  onActionResult,
}) => {
  const setMainMessage = useGlobalStore((state) => state.setMainMessage);
  const updateField = usePageStore((state) => state.updateField);
  const filters = useGlobalStore((state) => state.filters);

  useEffect(() => {
    if (!ModelSingular?.[scope]) {
      const errorMsg = `Zdefiniowany scope: ${
        scope || "null"
      } powinien występować jako Model po stronie serwera`;
      setMainMessage(errorMsg, "error");
    } else {
      handleAction();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAction = async () => {
    try {
      const result = await fetchItems(scope,filters);
      updateField(scope,result); 
      const successMsg = `Successfully fetched items for scope: ${scope}`;
      setMainMessage(successMsg, "success");
      onActionResult(true);
    
    } catch (error) {
      const errorMsg = `Error fetching items for scope: ${scope}`;
      setMainMessage(errorMsg, "error");
    }
  };

  return <ActionMsg type="success">RUN: Fetch action</ActionMsg>;
};

export default FetchItemsAction;
