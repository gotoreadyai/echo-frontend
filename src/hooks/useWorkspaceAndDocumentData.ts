import { useQuery } from "@tanstack/react-query";
import { fetchItemBySlug } from "../services/genericService";
import { PathParams } from "../types/types";
import { useParams } from "react-router-dom";

const useWorkspaceAndDocumentData = () => {
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
    queryKey: ["document", slug],
    queryFn: () => fetchItemBySlug("document", slug || "documents"),
    enabled: !!workspaceData,
  });

  return {
    workspaceData,
    documentData,
    isWorkspaceLoading,
    isDocumentLoading,
    workspaceError,
    documentError,
  };
};

export default useWorkspaceAndDocumentData;
