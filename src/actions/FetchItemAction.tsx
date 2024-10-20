import { fetchItemById } from "../services/genericService";
import { useGlobalStore, usePageStore } from "../stores";
import { FetchItemsActionProps } from "../types/types";

export const FetchItemsAction = async (
  scope: FetchItemsActionProps["scope"]
) => {
  const { filters, setMainMessage } = useGlobalStore.getState();
  const { updateField } = usePageStore.getState();
  try {
    const result = await fetchItemById(scope, filters[scope].id);
    updateField(scope, result);
    const successMsg = `Successfully fetched items for scope: ${scope}`;
    setMainMessage(successMsg, "success");
  } catch (error) {
    console.error(`Error fetching items for scope: ${scope}`, error);
    const errorMsg = `Failed to fetch items for scope: ${scope}`;
    setMainMessage(errorMsg, "error");
  }
};

export default FetchItemsAction;
