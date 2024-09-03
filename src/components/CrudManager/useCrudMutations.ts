// components/CrudManager/useCrudMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createItem,
  updateItem,
  deleteItem,
  updateContentBySlug,
} from "../../services/genericService";
import { MutationSuccessHandler } from "./Types";

interface UseCrudMutationsProps<T> {
  model: string | undefined;
  setSelectedItem: (item: T | null) => void;
  setErrorMessage: (message: string | null) => void;
}

export const useCrudMutations = <T extends Record<string, unknown>>({
  model,
  setSelectedItem,
  setErrorMessage,
}: UseCrudMutationsProps<T>) => {
  const queryClient = useQueryClient();

  const handleMutationSuccess: MutationSuccessHandler = () => {
    queryClient.invalidateQueries({ queryKey: [model] });
    setSelectedItem(null);
    setErrorMessage(null); // Clear any previous error message
  };

  const handleMutationError = (error: unknown) => {
    if (error instanceof Error) {
      setErrorMessage(`An error occurred: ${error.message}`);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const createMutation = useMutation({
    mutationFn: (newItem: T) => createItem(model || "", newItem),
    onSuccess: handleMutationSuccess,
    onError: handleMutationError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, item }: { id: string; item: T }) =>
      updateItem(model || "", id, item),
    onSuccess: handleMutationSuccess,
    onError: handleMutationError,
  });

  const updateContentMutation = useMutation({
    mutationFn: ({
      model,
      slug,
      slot,
      content,
    }: {
      model: string;
      slug: string;
      slot: string;
      content: T;
    }) => updateContentBySlug(model, slug,slot, content),
    onSuccess: handleMutationSuccess,
    onError: handleMutationError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteItem(model || "", id),
    onSuccess: handleMutationSuccess,
    onError: handleMutationError,
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    updateContentMutation,
  };
};
