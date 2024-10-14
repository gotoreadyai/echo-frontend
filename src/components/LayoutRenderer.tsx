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
import { BlockSidebar, ScopePanel, TopBar } from "./editor";
import Drawer from "./uikit/Drawer";
import { useGlobalStore } from "../stores/globalStore";
import { editConditions } from "../utils/layoutRenderer";
import { KeyboardHandler, useNavigation, useInitialQuerys } from "../hooks";
import { useParams } from "react-router-dom";
import Logo from "../blocks/Logo";
import PluginUpdater from "./pluginUpdater/PluginUpdater";
import ScopeManager from "./editor/ScopeManager";

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
  const scopeManager = useGlobalStore((state) => state.scopeManager);

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
        <Logo />
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

  const layoutConfig =
    action === "edit-side"
      ? layoutsConfig["SideLayout"]
      : layoutsConfig[currentLayout];

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

  console.log(workspaceData);

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
          <div className={`flex flex-col min-h-screen ${rightbar && "w-3/4"}`}>
            <TopBar />
            <KeyboardHandler />

            {action === "edit-scope" && (
              <div className="bg-base-300">
                <ScopePanel />
              </div>
            )}

            {!action || action !== "edit-scope" ? (
              <Suspense fallback={null}>
                {layoutConfig.component &&
                  React.createElement(layoutConfig.component, slotProps)}
              </Suspense>
            ) : null}

            {rightbar && (
              <RightBar>
                {rightbar === "user" && <LoginForm />}
                {rightbar === "block" && <BlockDetailsPanel />}
                {rightbar === "workspaces" && <CreateWorkspace />}
                {rightbar === "pluginupdater" && <PluginUpdater />}
              </RightBar>
            )}
            {scopeManager.selectedRJSF_Id && (
              <dialog id="my_modal_1" className="modal modal-open">
                <div className="modal-box w-11/12 max-w-5xl">
                  <ScopeManager />
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        onClick={() =>
                          useGlobalStore.setState(() => ({
                            scopeManager: {
                              ...useGlobalStore.getState().scopeManager,
                              selectedRJSF_Id: "",
                            },
                          }))
                        }
                        className="btn"
                      >
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            )}
          </div>
        </>
      }
    />
  );
};

export default LayoutRenderer;
