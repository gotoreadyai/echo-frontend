// components/CrudManager/CrudManager.tsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FiPlusCircle } from "react-icons/fi";
import { ModelData, ModelSingular } from "../../../models_EXPORT/models";
import { fetchItems } from "../../services/genericService";
import { useNavAction } from "../useNavAction";
import { FormModal } from "./FormModal";
import { RenderFormFields } from "./RenderFormFields";
import { RenderTableHeaders } from "./RenderTableHeaders";
import { RenderTableRows } from "./RenderTableRows";
import { CrudManagerParams, SelectedItem } from "./Types";
import { useCrudMutations } from "./useCrudMutations";

type ItemType = {
  _relatedFrom?: string;
  _relatedTo?: string;
  id?: string | number;
  [key: string]: unknown;
};

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
    queryFn: () => fetchItems(model || "", related, id),
    enabled: !!model,
  });

  const { createMutation, updateMutation, deleteMutation } = useCrudMutations({
    model,
    setSelectedItem,
    setErrorMessage,
  });

  const handleSelect = (item: Record<string, unknown> = {}) => {
    /* create new with relation - fix hardcoded ID */
    setSelectedItem(
      item[`${related}Id`] ? item : { ...item, [`${related}Id`]: id }
    );
    navAction("", "create");
  };

  const handleRelation = (item: Record<string, ItemType>) => {
    setSelectedItem(null);
    if (typeof item._relatedFrom === "string") {
      navAction(
        item._relatedFrom,
        "list",
        ModelSingular[item._relatedTo as unknown as string],
        item.id.toString()
      );
    } else {
      console.error("Invalid type for _relatedFrom");
    }
  };


  const handleSave = () => {
    
    selectedItem?.id
      ? updateMutation.mutate({
          id: selectedItem.id as string,
          item: selectedItem,
        })
      : createMutation.mutate(selectedItem!);
    navAction("", "list");
  };

  const handleClose = () => {
    setSelectedItem(null);
    navAction("", "list");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>CRUD Error loading {model}</div>;
  if (!config)
    return (
      <div>Error: Configuration could not be loaded for model "{model}".</div>
    );

  return (
    <>
      <div className="flex gap-md items-center mb-4">
        <h1 className="text-2xl font-bold uppercase">{model}</h1>
        <button className="btn btn-primary" onClick={() => handleSelect()}>
        <FiPlusCircle /> Create New Item
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

      <table
        width={"100%"}
        className="table table-zebra w-full border-collapse "
      >
        <thead>
          <tr>
            <RenderTableHeaders config={config} />
          </tr>
        </thead>
        <tbody>
          {model && data[model] && (
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

      <div className="join">
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">99</button>
        <button className="join-item btn">100</button>
      </div>

      {action === "create" && (
        <FormModal handleClose={handleClose}>
          <RenderFormFields
            config={config}
            selectedItem={
              selectedItem as Record<
                string,
                string | number | boolean | null
              > | null
            }
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
