import { KeyboardHandler, useInitialQuerys } from "../hooks";
import { Suspense } from "react";
import { useDynamicImport } from "../hooks/useDynamicImport";
import { BlockSidebar, ScopePanel, TopBar, ScopeManager } from "./editor";
import { useParams } from "react-router-dom";
import { PathParams } from "../types/types";
import { RightBar, SlotsRenderer } from ".";
import { Drawer, Modal, RightBarWrapper } from "./uikit";
import { useBlockStore, useGlobalStore } from "../stores";

export const LayoutRenderer: React.FC = () => {
  const storedPage = useBlockStore((state) => state.slots);

  const { workspace, action } = useParams<PathParams>();
  const scopeManager = useGlobalStore((state) => state.scopeManager);
  const rightbar = new URLSearchParams(window.location.search).get("rightbar");
  const { workspaceData, isWorkspaceLoading, isDocumentLoading } =
    useInitialQuerys();

  const LayoutComponent = useDynamicImport(
    `../layouts/${workspaceData?.content._pageData.layout}`,
    "../layouts/MainDashboard"
  );

  if (isWorkspaceLoading || isDocumentLoading || !LayoutComponent) {
    return (
      <div
        data-theme
        className="bg-base-100 text-base-content p-lg h-screen"
      ></div>
    );
  }

  return (
    <Drawer
      key={workspace}
      context={
        action ? (
          <BlockSidebar />
        ) : (
          storedPage._sideStatic && (
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
          <KeyboardHandler />
          <TopBar />
          <Suspense fallback={<></>}>
            {storedPage && (
              <LayoutComponent
                key={workspace}
                workspace={workspaceData.content}
                page={storedPage}
              />
            )}
          </Suspense>

          {rightbar && (
            <RightBarWrapper>
              <RightBar />
            </RightBarWrapper>
          )}

          {action === "edit-scope" && (
            <Modal>
              <ScopePanel />
            </Modal>
          )}

          {scopeManager.selectedRJSF_Id && (
            <Modal>
              <ScopeManager />
            </Modal>
          )}
        </>
      }
    />
  );
};

export default LayoutRenderer;
