import { deleteItem } from "../services/genericService";
import { useGlobalStore } from "../stores";
import { FetchItemsActionProps } from "../types/types";

export const DeleteAction = async (scope: FetchItemsActionProps["scope"]) => {
  const { filters, setMainMessage } = useGlobalStore.getState();
  try {
    await deleteItem(scope, filters[scope].id);
    const successMsg = `Successfully fetched items for scope: ${scope}`;
    setMainMessage(successMsg, "success");
  } catch (error) {
    const errorMsg = `Failed to fetch items for scope: ${scope}`;
    setMainMessage(errorMsg, "error");
  }
};

export default DeleteAction;
