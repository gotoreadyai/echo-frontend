/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModelSingular } from "../../models_EXPORT/models";
import qs from 'qs';


const getAuthTokenFromCookie = (): string | null => {
  const name = "auth_token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (const cookie of cookieArray) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(name)) {
      return trimmedCookie.substring(name.length);
    }
  }
  return null;
};

const getHeadersWithToken = (): HeadersInit => {
  const token = getAuthTokenFromCookie();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
const handleResponse = async (response: Response, errorMessage: string) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw { ...errorData, msg: errorMessage };
  }

  return response.json();
};

export const fetchItems = async (
  resourceName: string,
  filters: any,
) => {
  const queryString = qs.stringify(filters[resourceName]);
  const endpoint = `${
    import.meta.env.VITE_API_ENDPOINT
  }/${resourceName}?${queryString}`;
  const response = await fetch(endpoint);
  return handleResponse(response, `Failed to fetch ${resourceName}`);
};

export const fetchItemById = async (resourceName: string, id: string) => {
  const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/${resourceName}/${id}`;
  const response = await fetch(endpoint);
  return handleResponse(response, `Failed to fetch document with slug: ${id}`);
};

export const fetchItemBySlug = async (resourceName: string, slug: string) => {
  const endpoint = `${
    import.meta.env.VITE_API_ENDPOINT
  }/${resourceName}/slug/${slug}`;
  const response = await fetch(endpoint);

  return handleResponse(
    response,
    `Failed to fetch document with slug: ${slug}`
  );
};

export const createItem = async (
  resourceName: string,
  newItem: Record<string, unknown>
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/${resourceName}`,
    {
      method: "POST",
      headers: getHeadersWithToken(),
      body: JSON.stringify(newItem),
    }
  );

  return handleResponse(response, `Failed to create ${resourceName}`);
};

export const updateItem = async (
  resourceName: string,
  id: string,
  updatedItem: Record<string, unknown>
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/${resourceName}/${id}`,
    {
      method: "PUT",
      headers: getHeadersWithToken(),
      body: JSON.stringify(updatedItem),
    }
  );

  return handleResponse(response, `Failed to update ${resourceName}`);
};

export const updateItemBySlug = async (
  resourceName: string,
  slug: string,
  updatedItem: Record<string, unknown>
) => {
  const singular = ModelSingular[resourceName] || "";

  const endpoint = `${
    import.meta.env.VITE_API_ENDPOINT
  }/${singular}/slug/${slug}`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: getHeadersWithToken(),
    body: JSON.stringify(updatedItem),
  });

  return handleResponse(
    response,
    `Failed to update ${resourceName} with slug: ${slug}`
  );
};

export const updateContentBySlug = async (
  resourceName: string,
  slug: string,
  slot: string,
  content: Record<string, unknown>
) => {
  const endpoint = `${
    import.meta.env.VITE_API_ENDPOINT
  }/${resourceName}/slug/${slug}/content`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: getHeadersWithToken(),
    body: JSON.stringify({ key: slot, value: content }),
  });

  return handleResponse(
    response,
    `Failed to update ${resourceName} with slug: ${slug}`
  );
};

export const deleteItem = async (resourceName: string, id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/${resourceName}/${id}`,
    {
      method: "DELETE",
      headers: getHeadersWithToken(),
    }
  );

  return handleResponse(response, `Failed to delete ${resourceName}`);
};
