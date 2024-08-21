import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
} from "../services/genericService";
import { ModelData, ModelSingular } from "../../models_EXPORT/models";
import {
  ConfigType,
  CrudManagerParams,
  MutationSuccessHandler,
  SelectedItem,
} from "./CrudManager/Types";
import { RenderFormFields } from "./CrudManager/RenderFormFields";
import { RenderTableRows } from "./CrudManager/RenderTableRows";
import { FormModal } from "./CrudManager/FormModal";
import { listRelations } from "./CrudManager/RELATIONS";

export const CrudManager: React.FC = () => {
  const navigate = useNavigate();
  const { workspace, model, action } = useParams<CrudManagerParams>();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pobieramy bieżące query params z location
  const currentQueryParams = new URLSearchParams(location.search);
  const basepath = `/${workspace}/pl/${model}`;

  const { data, isLoading, error } = useQuery({
    queryKey: [model],
    queryFn: () => fetchItems(model || ""),
    enabled: !!model,
  });

  const config: ConfigType | null = model ? ModelData[model] : null;

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

  const handleSelect = (item: Record<string, any>) => {
    setSelectedItem(item);
    navigate(`${basepath}/create?id=${item.id}`);
  };

  const handleRelation = (item: Record<string, any>) => {
    setSelectedItem(null);
    navigate(`/${workspace}/pl/${item._relatedFrom}/list/${ModelSingular[item._relatedTo]}/${item.id}`);
  };  

  const handleSave = () => {
    if (selectedItem?.id) {
      updateMutation.mutate({ id: selectedItem.id, item: selectedItem });
    } else {
      createMutation.mutate(selectedItem!);
    }
    navigate(`${basepath}`);
  };

  const handleClose = () => {
    setSelectedItem(null);
    navigate(`${basepath}`);
  };

  const renderTableHeaders = () => {
    if (!config) return null;

    return (
      <>
        {Object.keys(config).map((key) => (
          <th
            key={key}
            className={`${(key === "title" || key === "content") && "w-1/4"}`}
          >
            {key}
          </th>
        ))}
        <th>Actions</th>
      </>
    );
  };

  // Clear error message on route change
  useEffect(() => {
    setErrorMessage(null);
  }, [location.pathname]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading {model}</div>;
  if (!config)
    return (
      <div>Error: Configuration could not be loaded for model "{model}".</div>
    );

  return (
    <>
      <div className="flex gap-md items-center mb-4">
        <h1 className="text-2xl font-bold uppercase">{model}</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`${basepath}/create?${currentQueryParams.toString()}`)}
        >
          Create New Item
        </button>
      </div>

      {errorMessage && (
        <div className="alert alert-error mb-4">{errorMessage}</div>
      )}

      <div className="mb-4">
        <table className="table table-zebra w-full border-collapse">
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>
            {model && data && (
              <RenderTableRows
                config={config}
                handleSelect={handleSelect}
                handleRelation={handleRelation}
                model={model}
                data={data}
                deleteMutation={deleteMutation}
              />
            )}
          </tbody>
        </table>
      </div>
      {action === "create" && (
        <FormModal handleClose={handleClose}>
          <RenderFormFields
            config={config}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <button className="btn btn-success mt-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary mt-2 ml-2" onClick={handleClose}>
            Cancel
          </button>
        </FormModal>
      )}
    </>
  );
};
