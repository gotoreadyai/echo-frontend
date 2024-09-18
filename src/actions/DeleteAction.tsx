/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { deleteItem } from "../services/genericService";
import { usePageStore } from "../stores/pageStore";
import useNavigation from "../hooks/useNavigation";
import { FetchItemsActionProps } from "../types/types";
import ActionMsg from "../components/uikit/ActionMsg";

const DeleteAction:  React.FC<FetchItemsActionProps> = ({
  scope,
  onActionResult,
}) => {
  const { getUSParam } = useNavigation();
  const pageData = usePageStore((state) => state.pageData);
 
  const handleAction = async () => {
    if (!scope || !pageData[scope]) {
      alert("Scope is undefined or invalid.");
      return;
    }
  
    try {
      const result = await deleteItem(scope, getUSParam(`${scope}_id`) ?? "");
      console.log("Sign In successful:", result);
      onActionResult(true);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ActionMsg type="info">RUN: Delete to: {scope}</ActionMsg>;
};
export default DeleteAction;
