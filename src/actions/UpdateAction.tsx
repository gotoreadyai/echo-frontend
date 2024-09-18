/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { updateItem } from "../services/genericService";
import { usePageStore } from "../stores/pageStore";
import useNavigation from "../hooks/useNavigation";
import { FetchItemsActionProps } from "../types/types";
import ActionMsg from "../components/uikit/ActionMsg";

const UpdateAction:  React.FC<FetchItemsActionProps> = ({
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
      const result = await updateItem(scope, getUSParam(`${scope}_id`) ?? "", {
        title: pageData[scope].title,
      });
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

  return <ActionMsg type="info">RUN: Update to: {scope}</ActionMsg>;
};
export default UpdateAction;
