/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useGlobalStore } from "../stores/globalStore";
import ActionMsg from "../components/uikit/ActionMsg";
import { usePageStore } from "../stores/pageStore";
import { FetchItemsActionProps } from "../types/types";
import { genErrorMessage } from "../utils/actions";
import { createItem } from "../services/genericService";

const CallToAiAction: React.FC<FetchItemsActionProps> = ({
  scope,
  onActionResult,
}) => {
  const setMainMessage = useGlobalStore((state) => state.setMainMessage);
  const initialData = usePageStore((state) => state.pageData[scope]);

  useEffect(() => {
    console.log("----CallToAiAction", scope);

    if (!scope) {
      const errorMsg = `Zdefiniowany scope: ${
        scope || "null"
      } powinien występować jako Model po stronie serwera`;
      setMainMessage(errorMsg, "error");
    } else {
      console.log(scope, initialData);
      handleAction();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAction = async () => {
    try {
      const result = await createItem("openAICall", initialData);
      const successMsg = `Successfully fetched items for scope: ${scope} & ${result}`;
      /* this is important log for waiting for rsult from oai */
      console.log("Result:", result);
      setMainMessage(successMsg, "success");
      onActionResult(true);
    } catch (error: any) {
      setMainMessage(genErrorMessage(error, scope), "error");
    }
  };

  return (
    <ActionMsg type="info">
      RUN: Call_To_OAI action - waiting for result
    </ActionMsg>
  );
};

export default CallToAiAction;
