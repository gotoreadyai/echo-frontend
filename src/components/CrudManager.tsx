// components/CrudManager/CrudManager.tsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../services/genericService";
import { ModelData, ModelSingular } from "../../models_EXPORT/models";
import { CrudManagerParams, SelectedItem } from "./CrudManager/Types";
import { RenderFormFields } from "./CrudManager/RenderFormFields";
import { RenderTableRows } from "./CrudManager/RenderTableRows";
import { FormModal } from "./CrudManager/FormModal";
import { useNavAction } from "./useNavAction";
import { useCrudMutations } from "./CrudManager/useCrudMutations";
import { RenderTableHeaders } from "./CrudManager/RenderTableHeaders";

export const CrudManager: React.FC = () => {
  const { model, action, related, id } = useParams<CrudManagerParams>();
  const config = model ? ModelData[model] : null;
  const location = useLocation();
  const { navAction } = useNavAction();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => setErrorMessage(null), [location.pathname]);

  const { data, isLoading, error } = useQuery({
    queryKey: [model],
    queryFn: () => fetchItems(model || "",related,id),
    enabled: !!model,
  });

  const { createMutation, updateMutation, deleteMutation } = useCrudMutations({
    model,
    setSelectedItem,
    setErrorMessage,
  });

  const handleSelect = (item: Record<string, any> = {}) => {
    /* create new with relation - fix hardcoded ID */
    setSelectedItem(
      item[`${related}Id`] ? item : { ...item, [`${related}Id`]: id }
    );
    navAction("", "create");
  };

  const handleRelation = (item: Record<string, any>) => {
    setSelectedItem(null);
    navAction(
      item._relatedFrom,
      "list",
      ModelSingular[item._relatedTo],
      item.id
    );
  };

  const handleSave = () => {
    selectedItem?.id
      ? updateMutation.mutate({ id: selectedItem.id, item: selectedItem })
      : createMutation.mutate(selectedItem!);
    navAction("", "list");
  };

  const handleClose = () => {
    setSelectedItem(null);
    navAction("", "list");
  };

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
        <button className="btn btn-primary" onClick={() => handleSelect()}>
          Create New Item
        </button>
      </div>

      {errorMessage && (
        <div
          onClick={() => setErrorMessage(null)}
          className="alert alert-error mb-4 cursor-pointer"
        >
          {errorMessage}
        </div>
      )}

      <div className="mb-4">
        <table width={"100%"} className="table table-zebra w-full border-collapse ">
          <thead>
            <tr>
              <RenderTableHeaders config={config} />
            </tr>
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
