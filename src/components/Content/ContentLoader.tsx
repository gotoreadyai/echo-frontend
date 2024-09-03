import React, { Suspense, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchItemBySlug } from "../../services/genericService";
import { CrudManagerParams } from "../CrudManager/Types";
import { useParams } from "react-router-dom";
import { ContentEditor } from "./ContentEditor";
import { TopBar } from "./TopBar";
import { Content, ModelData, WorkspaceData } from "../Blocks/Types";

export const ContentLoader: React.FC = () => {
  const { workspace, model, action } = useParams<CrudManagerParams>();

  const {
    data: workspaceData,
    isLoading: workspaceLoading,
    error: workspaceError,
  } = useQuery<WorkspaceData>({
    queryKey: ["workspace_layout", workspace],
    queryFn: () => fetchItemBySlug("workspace", workspace || "home"),
  });

  const shouldFetchModelData = workspaceData?.workspace?.content?.withPages;

  const {
    data: modelData,
    isLoading: modelLoading,
    error: modelError,
  } = useQuery<ModelData>({
    queryKey: ["model_data", model],
    queryFn: () => fetchItemBySlug("document", model || "index"),
    enabled: !!shouldFetchModelData,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Content | any>(null);

  useEffect(() => {
    if (modelData?.document?.content) {
      setContent(modelData.document.content);
    }
  }, [modelData]);

  if (workspaceLoading || (shouldFetchModelData && modelLoading))
    // return <div className="container mx-auto">Loading...</div>;
    return <></>;
  if (workspaceError || (shouldFetchModelData && modelError))
    return <div className="container mx-auto">Error loading data</div>;

  const layoutType =
    workspaceData?.workspace?.content?.layout || "MainDashboard";
  const LayoutComponent = React.lazy(
    () => import(`../../components/Layouts/${layoutType}`)
  );

  if (action === "edit-blocks") {
    return shouldFetchModelData && content ? (
      <>
        <TopBar />
        <ContentEditor content={content} setContent={setContent} />
      </>
    ) : (
      <>Uneditable area</>
    );
  }

  return (
    <>
      <TopBar />

      

      {LayoutComponent ? (
        <Suspense fallback={<></>}>
          {/* <Suspense fallback={<div>Loading layout...</div>}> */}
          <LayoutComponent content={content} />
        </Suspense>
      ) : (
        <>No layout found</>
      )}

      <div className="font-title text-center text-6xl font-[950] leading-[1.1] drop-shadow-[0_1.2px_1.2px_theme(colors.neutral)] xl:w-[115%] xl:text-start ">
        <span className="[&::selection]:text-base-content brightness-150 contrast-150 ">
          Embrace learning
        </span>
        <br />
        <span className="inline-grid">
          <span
            className="pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text blur-xl [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] before:content-[attr(data-text)] "
            aria-hidden="true"
            data-text="component library"
          ></span>
          <span className="col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent]  ">
            component library
          </span>
        </span>

        <br />
        <span className=" brightness-150 contrast-150 ">for Tailwind CSS</span>
      </div>
    </>
  );
};
