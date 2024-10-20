import { useQuery } from "@tanstack/react-query";
import { fetchItemBySlug } from "../services/genericService";
import { PathParams } from "../types/types";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBlockStore } from "../stores";

const useInitialQuerys = () => {
  const { workspace, slug } = useParams<PathParams>();

  const {
    data: workspaceData,
    isLoading: isWorkspaceLoading,
    error: workspaceError,
  } = useQuery({
    queryKey: ["workspace", workspace],
    queryFn: () => fetchItemBySlug("workspace", workspace || "dashboard"),
  });

  const {
    data: documentData,
    isLoading: isDocumentLoading,
    error: documentError,
  } = useQuery({
    queryKey: ["document", `page-${slug}`],
    queryFn: () => fetchItemBySlug("document", slug || "documents"),
    enabled: !!workspaceData,
    select: (data) => {
      return data;
    },
  });

  useEffect(() => {
    if (documentData && workspaceData) {
      useBlockStore.setState(() => ({
        slots: documentData.content,
      }));
    }
  }, [documentData]);

  return {
    workspaceData,
    documentData,
    isWorkspaceLoading,
    isDocumentLoading,
    workspaceError,
    documentError,
  };
};

export default useInitialQuerys;
