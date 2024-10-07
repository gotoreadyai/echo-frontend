// src/components/InsertAction.tsx

import React, { useEffect } from "react";
import { createItem } from "../services/genericService";
import { usePageStore } from "../stores/pageStore";
import ActionMsg from "../components/uikit/ActionMsg";
import { useGlobalStore } from "../stores/globalStore";
import { genErrorMessage } from "../utils/actions";

interface InsertActionProps {
  scope: string;
  onActionResult: (result: boolean) => void;
  whitelist?: string[]; // Array of field names to skip reference checks
}

const InsertAction: React.FC<InsertActionProps> = ({
  scope,
  onActionResult,
  // whitelist = ["ownerId"],
}) => {
  const setMainMessage = useGlobalStore((state) => state.setMainMessage);
  const pageData = usePageStore((state) => state.pageData);
  // const filters = useGlobalStore((state) => state.filters);





  const handleAction = async () => {
  
    // const itemData = { ...modelSchema, ...pageData[scope], ...filters[scope] };
    try {
      await createItem(scope, pageData[scope]);
      const successMsg = `Successfully created item for scope: ${scope}`;
      setMainMessage(successMsg, "success");
      onActionResult(true);
    } catch (error) {
      setMainMessage(genErrorMessage(error, scope), "error");
      onActionResult(false);
    }
  };

  useEffect(() => {
    handleAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ActionMsg type="info">RUN: Insert to: {scope}</ActionMsg>;
};

export default InsertAction;
