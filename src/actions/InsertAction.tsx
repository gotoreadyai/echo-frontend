import { createItem } from "../services/genericService";
import { useGlobalStore, usePageStore } from "../stores";
import { FetchItemsActionProps } from "../types/types";

export const InsertAction = async (scope: FetchItemsActionProps["scope"]) => {
  const { setMainMessage } = useGlobalStore.getState();
  const { pageData } = usePageStore.getState();
  try {
    await createItem(scope, pageData[scope]);
    const successMsg = `Successfully fetched items for scope: ${scope}`;
    setMainMessage(successMsg, "success");
  } catch (error) {
    const errorMsg = `Failed to fetch items for scope: ${scope}`;
    setMainMessage(errorMsg, "error");
  }
};

export default InsertAction;
