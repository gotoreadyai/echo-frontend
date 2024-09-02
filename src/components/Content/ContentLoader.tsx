import React, { Suspense, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchItemBySlug } from "../../services/genericService";
import { CrudManagerParams } from "../CrudManager/Types";
import { useParams } from "react-router-dom";
import { ContentRenderer } from "./ContentRenderer";
import { ContentEditor } from "./ContentEditor";

// Dynamic imports for layouts
const MainDashboard = React.lazy(
  () => import("../../components/Layouts/MainDashboard")
);
const OneColumn = React.lazy(
  () => import("../../components/Layouts/OneColumn")
);
const TwoColumns = React.lazy(
  () => import("../../components/Layouts/TwoColumns")
);

export const ContentLoader: React.FC = () => {
  const { workspace, model, action } = useParams<CrudManagerParams>();

  const {
    data: workspaceData,
    isLoading: workspaceLoading,
    error: workspaceError,
  } = useQuery({
    queryKey: ["workspace_layout", workspace],
    queryFn: () => fetchItemBySlug("workspace", workspace || "home"),
  });

  // Only fetch model data if withPages is true
  const shouldFetchModelData = workspaceData?.workspace?.content?.withPages;

  const {
    data: modelData,
    isLoading: modelLoading,
    error: modelError,
  } = useQuery({
    queryKey: ["model_data", model],
    queryFn: () => fetchItemBySlug("document", model || "index"),
    enabled: shouldFetchModelData,
  });

  // Dynamic layout mapping
  const LAYOUTS: Record<
    string,
    React.LazyExoticComponent<React.FC<{ content: React.ReactElement | null }>>
  > = {
    MainDashboard: MainDashboard,
    OneColumn: OneColumn,
    TwoColumns: TwoColumns,
  };

  // State for blocks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blocks, setBlocks] = useState<any[]>([]);

  // Update blocks when modelData changes
  useEffect(() => {
    if (modelData?.document?.content?.blocks) {
      setBlocks(modelData.document.content.blocks);
    }
  }, [modelData]);

  if (workspaceLoading || (shouldFetchModelData && modelLoading))
    return <div className="container mx-auto">Loading...</div>;
  if (workspaceError || (shouldFetchModelData && modelError))
    return <div className="container mx-auto">Error loading data</div>;

  // Safeguard against undefined workspaceData and layout
  const layoutType =
    workspaceData?.workspace?.content?.layout || "MainDashboard";
  const LayoutComponent = LAYOUTS[layoutType] || null;

  // Render ContentEditor without layout for "edit-block" action
  if (action === "edit-blocks") {
    return shouldFetchModelData && blocks.length > 0 ? (
      <ContentEditor
        blocks={blocks.length > 0 ? blocks : []} // Pass the blocks to the editor
        setBlocks={setBlocks} // Use the handler to update blocks
      />
    ) : (
      <></>
    );
  }

  // Render layout with content for other actions
  return (
    <>
      {LayoutComponent ? (
        <Suspense fallback={<div>Loading layout...</div>}>
          <LayoutComponent
            content={
              shouldFetchModelData && blocks.length > 0 ? (
                <ContentRenderer blocks={blocks} />
              ) : shouldFetchModelData ? (
                <div>No content available</div>
              ) : (
                <div>No pages to display</div>
              )
            }
          />
        </Suspense>
      ) : (
        <>No layout found</>
      )}
    </>
  );
};
