import React, { useEffect } from "react";
import { createItem } from "../services/genericService";
import { usePageStore } from "../stores/pageStore";
import ActionMsg from "../components/uikit/ActionMsg";
import { useGlobalStore } from "../stores/globalStore";
import { genErrorMessage, getModelKey } from "../utils/actions";
import { ModelData } from "../../models_EXPORT/models";

interface InsertActionProps {
  scope: string;
  onActionResult: (result: boolean) => void;
  whitelist?: string[]; // Array of field names to skip reference checks
}

const InsertAction: React.FC<InsertActionProps> = ({
  scope,
  onActionResult,
  whitelist = ["ownerId"],
}) => {
  const setMainMessage = useGlobalStore((state) => state.setMainMessage);
  const pageData = usePageStore((state) => state.pageData);
  const filters = useGlobalStore((state) => state.filters);

  const handleAction = async () => {
    if (!scope || !pageData[scope]) {
      setMainMessage("Scope is undefined or invalid.", "error");
      return;
    }

    const modelSchema = ModelData[getModelKey(scope) || ""];
    if (!modelSchema) {
      setMainMessage("Model schema not found.", "error");
      return;
    }

    const requiredReferences = Object.keys(modelSchema).filter(
      (key) => modelSchema[key].references && !whitelist.includes(key)
    );

    const missingReferences = requiredReferences.filter(
      (ref) => !filters[scope] || !filters[scope][ref]
    );

    if (missingReferences.length > 0) {
      setMainMessage(
        `Missing required references in filters: ${missingReferences.join(
          ", "
        )}.`,
        "error"
      );
      return;
    }

    // Prepare the data for the createItem call, including necessary filters
    const itemData = {
      title: pageData[scope].title,
      slug: "",
      content: {
        _pageData: {
          layout: "MainDashboard",
        },
      },
      ...filters[scope], // Add the relevant filters to the data
    };

    try {
      await createItem(scope, itemData);
      const successMsg = `Successfully created item for scope: ${scope}`;
      setMainMessage(successMsg, "success");
      onActionResult(true);
    } catch (error) {
      setMainMessage(genErrorMessage(error, scope), "error");
    }
  };

  useEffect(() => {
    handleAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ActionMsg type="info">RUN: Insert to: {scope}</ActionMsg>;
};

export default InsertAction;
