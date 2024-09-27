/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, Suspense } from "react";
import { useBlockStore } from "../stores/blockStore";
import { usePageStore } from "../stores/pageStore";
import { layoutsConfig } from "../data/layoutsConfig";
import BlockDetailsPanel from "./editor/BlockDetailsPanel";
import RightBar from "./uikit/RightBar";
import { PathParams } from "../types/types";
import SlotsRenderer from "./SlotsRenderer";
import SlotsEditableRenderer from "./SlotsEditableRenderer";
import LoginForm from "./user/LoginForm";
import CreateWorkspace from "./workspaces/CreateWorkspace";
import { BlockSidebar, ScopePanel, SystemTab } from "./editor";
import Drawer from "./uikit/Drawer";
import { useGlobalStore } from "../stores/globalStore";
import NotificationMsg from "./uikit/NotificationMsg";
import { editConditions } from "../utils/layoutRenderer";
import { KeyboardHandler, useNavigation, useInitialQuerys } from "../hooks";
import { useParams } from "react-router-dom";
import Logo from "../blocks/Logo";

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
  const { getUSParam, getAll } = useNavigation();
  const rightbar = getUSParam("rightbar");
  const selectedLayoutName = usePageStore((state) => state.pageData?.layout);
  const setFilters = useGlobalStore((state) => state.setFilters);

  const {
    workspaceData,
    documentData,
    isWorkspaceLoading,
    isDocumentLoading,
    workspaceError,
    documentError,
  } = useInitialQuerys();

  useEffect(() => {
    if (workspaceData && documentData) {
      const { _pageData, ...workspaceBlocks } = workspaceData.content;
      const documentBlocks = documentData?.content || {};
      const combinedBlocks = combineBlocks(workspaceBlocks, documentBlocks);
      setSlots(combinedBlocks);
      usePageStore.setState(() => ({
        pageData: {
          ..._pageData,
        },
      }));
      setFilters(getAll());
      updateLayout(_pageData);
    }
  }, [documentData, setSlots, workspaceData]);

  // Early return if loading
  if (isWorkspaceLoading || isDocumentLoading) {
    return (
      <div
        data-theme
        className="bg-base-100 text-base-content p-lg h-screen"
      ></div>
    );
  }

  // Early return if errors occur
  if (workspaceError || documentError) {
    return (
      <div className="text-error bg-base-100 h-screen p-lg">
        <Logo/>
        <div className=" bg-neutral-content p-md">
          Error loading content:{" "}
          {workspaceError?.message || documentError?.message}
        </div>
      </div>
    );
  }

  // Determine the current layout
  const currentLayout = layoutsConfig[selectedLayoutName]
    ? selectedLayoutName
    : Object.keys(layoutsConfig)[0];
  const layoutConfig = layoutsConfig[currentLayout];

  if (!layoutConfig) {
    return (
      <div>
        <div className="bg-neutral h-screentext-error">
          Error: layout config not found
        </div>
      </div>
    );
  }

  const slotProps = layoutConfig.slots.reduce((acc: any, slotName: string) => {
    const SlotComponent = editConditions(action)
      ? SlotsEditableRenderer
      : SlotsRenderer;
    acc[slotName] = <SlotComponent slots={slots} slotName={slotName} />;
    return acc;
  }, {});

  return (
    <Drawer
      context={
        action ? (
          <BlockSidebar />
        ) : (
          workspaceData.content._sideStatic && (
            <div className="flex flex-col border-r border-base-300 h-full">
              <SlotsRenderer
                slots={workspaceData.content}
                slotName={"_sideStatic"}
              />
            </div>
          )
        )
      }
      content={
        <>
          <div className={`${rightbar && "w-2/3"}`}>
            <SystemTab />
            <NotificationMsg />
            <KeyboardHandler />
            <div className="flex items-stretch">
              {action === "edit-scope" && (
                <div className="bg-base-300 w-3/5">
                  <ScopePanel />
                </div>
              )}
              <div className={`flex-1 ${action ? "px-xs  " : ""}`}>
                <Suspense fallback={null}>
                  {layoutConfig.component &&
                    React.createElement(layoutConfig.component, slotProps)}
                </Suspense>
              </div>
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
