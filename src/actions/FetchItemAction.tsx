/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { fetchItemById } from "../services/genericService";
import { useGlobalStore } from "../stores/globalStore";
import ActionMsg from "../components/uikit/ActionMsg";
import { usePageStore } from "../stores/pageStore";
import { FetchItemsActionProps } from "../types/types";
import { genErrorMessage } from "../utils/actions";

const FetchItemAction: React.FC<FetchItemsActionProps> = ({
  scope,
  onActionResult,
}) => {
  const setMainMessage = useGlobalStore((state) => state.setMainMessage);
  const updateField = usePageStore((state) => state.updateField);
  const filters = useGlobalStore((state) => state.filters);
  useEffect(() => {
    if (!scope) {
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
      const result = await fetchItemById(scope, filters[scope].id);
      updateField(scope, result);
      const successMsg = `Successfully fetched items for scope: ${scope}`;
      setMainMessage(successMsg, "success");
      onActionResult(true);
    } catch (error: any) {
      setMainMessage(genErrorMessage(error, scope), "error");
    }
  };

  return <ActionMsg type="info">RUN: Fetch action</ActionMsg>;
};

export default FetchItemAction;
