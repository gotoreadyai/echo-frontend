/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, Suspense } from "react";
import { useBlockStore } from "../stores/blockStore";
import { usePageStore } from "../stores/pageStore";
import { layoutsConfig } from "../data/layoutsConfig";
import BlockDetailsPanel from "./editor/BlockDetailsPanel";
import BlockSidebar from "./editor/BlockSidebar";
import { useParams } from "react-router-dom";
import ScopePanel from "./editor/ScopePanel";
import RightBar from "./uikit/RightBar";
import useWorkspaceAndDocumentData from "../hooks/useWorkspaceAndDocumentData";
import { PathParams } from "../types/types";
import SlotsRenderer from "./SlotsRenderer";
import SlotsEditableRenderer from "./SlotsEditableRenderer";
import LoginForm from "./user/LoginForm";
import CreateWorkspace from "./workspaces/CreateWorkspace";
import { SystemTab } from "./editor";
import Drawer from "./uikit/Drawer";
import KeyboardHandler from "../hooks/keyboardHandler";
import { FiLoader } from "react-icons/fi";
import useNavigation from "../hooks/useNavigation";

// Utility functions extracted for better readability and reusability
const combineBlocks = (workspaceBlocks: any, documentBlocks: any) => ({
  ...workspaceBlocks,
  ...documentBlocks,
});

const updateLayout = (_pageData: any) => {
  if (_pageData) {
    const validLayout = layoutsConfig[_pageData.layout]
      ? _pageData.layout
      : Object.keys(layoutsConfig)[0];
    usePageStore.setState((state) => ({
      ...state,
      pageData: { ...state.pageData, layout: validLayout },
      initialScope: { ..._pageData },
    }));
  }
};

const LayoutRenderer: React.FC = () => {
  const { slots, setSlots } = useBlockStore();
  const { action } = useParams<PathParams>();
  const { getUSParam } = useNavigation();
  const rightbar = getUSParam("rightbar");
  const selectedLayoutName = usePageStore((state) => state.pageData?.layout);

  const {
    workspaceData,
    documentData,
    isWorkspaceLoading,
    isDocumentLoading,
    workspaceError,
    documentError,
  } = useWorkspaceAndDocumentData();

  useEffect(() => {
    if (workspaceData) {
      const { _pageData, ...workspaceBlocks } = workspaceData.workspace.content;
      const documentBlocks = documentData?.document?.content || {};
      const combinedBlocks = combineBlocks(workspaceBlocks, documentBlocks);
      setSlots(combinedBlocks);
      usePageStore.setState(() => ({ pageData: _pageData }));
      updateLayout(_pageData);
    }
  }, [documentData, setSlots, workspaceData]);

  // Early return if loading or errors occur
  if (isWorkspaceLoading || isDocumentLoading) return null;
  if (workspaceError || documentError)
    return (
      <div className="text-error">
        Error loading content:{" "}
        {workspaceError?.message || documentError?.message}
      </div>
    );

  // Determine the current layout
  const currentLayout = layoutsConfig[selectedLayoutName]
    ? selectedLayoutName
    : Object.keys(layoutsConfig)[0];
  const layoutConfig = layoutsConfig[currentLayout];

  if (!layoutConfig) {
    return <div className="text-error">Error: layout config not found</div>;
  }

  // Slot rendering logic simplified
  const slotProps = layoutConfig.slots.reduce((acc: any, slotName: string) => {
    const SlotComponent =
      action === "edit-scope" ||
      action === "edit-document" ||
      action === "edit-block"
        ? SlotsEditableRenderer
        : SlotsRenderer;
    acc[slotName] = <SlotComponent slots={slots} slotName={slotName} />;
    return acc;
  }, {});

  return (
    <Drawer
      context={action ? <BlockSidebar /> : null}
      content={
        <>
          <div
            className={`${rightbar && "w-2/3"} ${
              action === "edit-scope" ||
              action === "edit-document" ||
              (action === "edit-block" && "pr-24")
            }`}
          >
            <SystemTab />
            <KeyboardHandler />
            <div className="flex items-stretch">
              {action === "edit-scope" && (
                <div className="bg-base-300 w-3/5">
                  <ScopePanel />
                </div>
              )}
              <div className="container-type-inline flex-1 ">
                <Suspense fallback={<></>}>
                  {layoutConfig.component &&
                    React.createElement(layoutConfig.component, slotProps)}
                </Suspense>
              </div>
              {(action === "edit-side" ||
                action === "edit-modal" ||
                action === "edit-workspace") && (
                <div className="bg-base-300 p-lg shadow text-center">
                  <FiLoader />
                  {action}
                </div>
              )}
            </div>
          </div>

          {rightbar && (
            <RightBar>
              {rightbar === "user" && <LoginForm />}
              {rightbar === "block" && <BlockDetailsPanel />}
              {rightbar === "workspaces" && <CreateWorkspace />}
            </RightBar>
          )}
        </>
      }
    />
  );
};

export default LayoutRenderer;
