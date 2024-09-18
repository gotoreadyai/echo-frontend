/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { createItem } from "../services/genericService";
import { usePageStore } from "../stores/pageStore";
import ActionMsg from "../components/uikit/ActionMsg";
import { getModelKey, sanitizeByModel } from "../utils/actions";
import { ModelData } from "../../models_EXPORT/models";

const InsertAction: React.FC = ({ scope, onActionResult }: any) => {
  const pageData = usePageStore((state) => state.pageData);
  const handleAction = async () => {
    if (!scope || !pageData[scope]) {
      alert("Scope is undefined or invalid.");
      return;
    }

    try {
      const modelSchema = ModelData[getModelKey(scope) || ""];
      const sanitFilters = sanitizeByModel(pageData["filters"], modelSchema);

      const result = await createItem(
        scope,
        { ...pageData[scope], ...sanitFilters }
        //   {
        //   title: pageData[scope].title,
        //   slug: "",
        //   content: {
        //     _pageData: {
        //       layout: "MainDashboard",
        //     },
        //   },
        // }
      );
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
