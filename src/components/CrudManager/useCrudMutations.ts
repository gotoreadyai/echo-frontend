// components/CrudManager/useCrudMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, updateItem, deleteItem } from "../../services/genericService";
import { MutationSuccessHandler } from "./Types";

interface UseCrudMutationsProps {
  model: string | undefined;
  setSelectedItem: (item: any) => void;
  setErrorMessage: (message: string | null) => void;
}

export const useCrudMutations = ({
  model,
  setSelectedItem,
  setErrorMessage,
}: UseCrudMutationsProps) => {
  const queryClient = useQueryClient();

  const handleMutationSuccess: MutationSuccessHandler = () => {
    queryClient.invalidateQueries({ queryKey: [model] });
    setSelectedItem(null);
    setErrorMessage(null); // Clear any previous error message
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

  return { createMutation, updateMutation, deleteMutation };
};
