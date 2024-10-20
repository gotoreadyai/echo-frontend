import { updateItem } from "../services/genericService";
import { useGlobalStore, usePageStore } from "../stores";
import { FetchItemsActionProps } from "../types/types";

export const UpdateAction = async (scope: FetchItemsActionProps["scope"]) => {
  const pageData = usePageStore((state) => state.pageData);
  const { setMainMessage, filters } = useGlobalStore.getState();
  try {
    await updateItem(scope, filters[scope].id, {
      ...pageData[scope],
    });
    const successMsg = `Successfully fetched items for scope: ${scope}`;
    setMainMessage(successMsg, "success");
  } catch (error) {
    const errorMsg = `Failed to fetch items for scope: ${scope}`;
    setMainMessage(errorMsg, "error");
  }
};

export default UpdateAction;
