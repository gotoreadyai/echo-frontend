// useCrudHandlers.ts
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, updateItem, deleteItem } from "../services/genericService";
import { ConfigType, MutationSuccessHandler, SelectedItem } from "./CrudManager/Types";

export const useCrudHandlers = (model: string | undefined, basepath: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const currentQueryParams = new URLSearchParams(location.search);

  const handleMutationSuccess: MutationSuccessHandler = () => {
    queryClient.invalidateQueries({ queryKey: [model] });
    setSelectedItem(null);
    setErrorMessage(null); // Clear any previous error message
    // Zachowujemy bieżący query params
    navigate(`${basepath}${location.search}`);
  };

  const handleMutationError = (error: any) => {
    setErrorMessage(`An error occurred: ${error.message}`);
  };

  const createMutation = useMutation({
    mutationFn: (newItem: Record<string, any>) =>
      createItem(model || "", newItem),
    onSuccess: handleMutationSuccess,
    onError: handleMutationError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, item }: { id: string; item: Record<string, any> }) =>
      updateItem(model || "", id, item),
    onSuccess: handleMutationSuccess,
    onError: handleMutationError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteItem(model || "", id),
    onSuccess: handleMutationSuccess,
    onError: handleMutationError,
  });

  const handleSelect = (item: Record<string, any>) => {
    setSelectedItem(item);
    // Dodajemy id do query params
    currentQueryParams.set("id", item.id);
    navigate(`${basepath}/create?${currentQueryParams.toString()}`, { replace: true });
  };

  const handleRelation = (item: Record<string, any>) => {
    setSelectedItem(null);
    navigate(`/${workspace}/pl/${item._relatedModel}?id=${item.id}`);
  };

  const handleSave = () => {
    if (selectedItem?.id) {
      updateMutation.mutate({ id: selectedItem.id, item: selectedItem });
    } else {
      createMutation.mutate(selectedItem!);
    }
  };

  const handleClose = () => {
    setSelectedItem(null);
    navigate(`${basepath}${location.search}`);
  };

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    handleSelect,
    handleRelation,
    handleSave,
    handleClose,
    handleMutationError,
  };
};
