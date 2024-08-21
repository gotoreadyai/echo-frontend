import { ModelSingular } from "../../models_EXPORT/models";

const enpoint = `http://localhost:3004`;

export const fetchItems = async (resourceName: string, related?: string, id?: string) => {
  const response = await fetch(related ? `${enpoint}/${resourceName}/${related}/${id}` : `${enpoint}/${resourceName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resourceName}`);
  }
  return response.json();
};

export const createItem = async (
  resourceName: string,
  newItem: Record<string, any>
) => {
  const singular: string = ModelSingular[resourceName] || "";
  const response = await fetch(`${enpoint}/${singular}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  if (!response.ok || singular === "") {
    throw new Error(`Failed to create ${resourceName}`);
  }
  return response.json();
};

export const updateItem = async (
  resourceName: string,
  id: string,
  updatedItem: Record<string, any>
) => {
  const response = await fetch(`${enpoint}/${resourceName}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  });
  if (!response.ok) {
    throw new Error(`Failed to update ${resourceName}`);
  }
  return response.json();
};

export const deleteItem = async (resourceName: string, id: string) => {
  const singular: string = ModelSingular[resourceName] || "";
  const response = await fetch(`${enpoint}/${singular}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok || singular === "") {
    throw new Error(`Failed to delete ${resourceName}`);
  }
  return response.json();
};
