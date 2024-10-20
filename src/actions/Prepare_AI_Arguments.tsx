/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import ActionMsg from "../components/uikit/ActionMsg";
import { genErrorMessage } from "../utils/actions";
import { getGetterByPath, useGlobalStore, usePageStore } from "../stores";

const Prepare_AI_Arguments: React.FC = ({ scope, onActionResult }: any) => {
  const setMainMessage = useGlobalStore((state) => state.setMainMessage);
  const data =
    usePageStore((state) => getGetterByPath(scope)(state.pageData)) || [];
  const _arguments = usePageStore((state) => getGetterByPath("callingFunction.function.function_call.arguments")(state.pageData)) || [];
  const updateField = usePageStore((state) => state.updateField);

  const handleAction = async () => {
    try {
      updateField("callingFunction.function.function_call.arguments", {..._arguments, ...data});
      const successMsg = `Successfully prepare AI items for scope: ${scope}`;
      setMainMessage(successMsg, "success");
      onActionResult(true);
    } catch (error: any) {
      setMainMessage(genErrorMessage(error, scope), "error");
    }
   
  };

  useEffect(() => {
    if (scope && data) {
      handleAction();
    }
  }, []);

  return <ActionMsg type="info">RUN: Prepare AI Arguments: {scope}</ActionMsg>;
};
export default Prepare_AI_Arguments;
