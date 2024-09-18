/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { createItem } from "../services/genericService";
import { usePageStore } from "../stores/pageStore";
import ActionMsg from "../components/uikit/ActionMsg";

const InsertAction: React.FC = ({scope,onActionResult}:any) => {
  const pageData = usePageStore((state) => state.pageData);
  const handleAction = async () => {
    if (!scope || !pageData[scope]) {
      alert("Scope is undefined or invalid.");
      return;
    }
  
    try {
      const result = await createItem("workspaces", {
        title: pageData[scope].title,
        slug: "",
        content: {
          _pageData: {
            layout: "MainDashboard",
          },
        },
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

  return <ActionMsg type="info">RUN: Insert to: {scope}</ActionMsg>;
};
export default InsertAction;
