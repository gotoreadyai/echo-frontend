import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
} from "../services/genericService";
import { ModelData } from "../../models_EXPORT/Models";
import {
  ConfigType,
  CrudManagerParams,
  MutationSuccessHandler,
  SelectedItem,
} from "./CrudManager/Types";
import { RenderFormFields } from "./CrudManager/RenderFormFields";
import { RenderTableRows } from "./CrudManager/RenderTableRows";

export const CrudManager: React.FC = () => {
  const { model } = useParams<CrudManagerParams>();
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: [model],
    queryFn: () => fetchItems(model || ""),
    enabled: !!model,
  });

  const config: ConfigType | null = model ? ModelData[model] : null;

  const handleMutationSuccess: MutationSuccessHandler = () => {
    queryClient.invalidateQueries({ queryKey: [model] });
    setSelectedItem(null);
  };

  const createMutation = useMutation({
    mutationFn: (newItem: Record<string, any>) =>
      createItem(model || "", newItem),
    onSuccess: handleMutationSuccess,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, item }: { id: string; item: Record<string, any> }) =>
      updateItem(model || "", id, item),
    onSuccess: handleMutationSuccess,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteItem(model || "", id),
    onSuccess: handleMutationSuccess,
  });

  const handleSave = () => {
    if (selectedItem?.id) {
      updateMutation.mutate({ id: selectedItem.id, item: selectedItem });
    } else {
      createMutation.mutate(selectedItem!);
    }
  };

  const renderTableHeaders = () => {
    if (!config) return null;

    return (
      <>
        {Object.keys(config).map((key) => (
          <th key={key}>{key}</th>
        ))}
        <th>Actions</th>
      </>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading {model}</div>;
  if (!config)
    return (
      <div>Error: Configuration could not be loaded for model "{model}".</div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{model}</h1>
      <div className="mb-4">
        <table className="table table-zebra w-full border-collapse">
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>
            {model && data && <RenderTableRows
              config={config}
              setSelectedItem={setSelectedItem}
              model={model}
              data={data}
              deleteMutation={deleteMutation}
            />}
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <RenderFormFields
          config={config}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />

        <button className="btn btn-success mt-2" onClick={handleSave}>
          Save
        </button>
        <button
          className="btn btn-secondary mt-2 ml-2"
          onClick={() => setSelectedItem(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
