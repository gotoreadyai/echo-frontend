import { ModelSingular } from "../../models_EXPORT/models";

const getAuthTokenFromCookie = (): string | null => {
  const name = "auth_token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim(); // Use `const` instead of `let`
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

export const fetchItems = async (
  resourceName: string,
  related?: string,
  id?: string,
  page?: number,
  limit?: number
) => {
  // Przygotowanie parametrów paginacji
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (limit) queryParams.append("limit", limit.toString());

  const endpoint = related
    ? `${
        import.meta.env.VITE_API_ENDPOINT
      }/${resourceName}/${related}/${id}?${queryParams}`
    : `${import.meta.env.VITE_API_ENDPOINT}/${resourceName}?${queryParams}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${resourceName}`);
  }

  const result = await response.json();
  return result;
};

export const fetchItemBySlug = async (resourceName: string, slug: string) => {
  const endpoint = `${
    import.meta.env.VITE_API_ENDPOINT
  }/${resourceName}/slug/${slug}`;

  console.log(endpoint);
  

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch document with slug: ${slug}`);
  }

  const result = await response.json();
  return result;
};

export const createItem = async (
  resourceName: string,
  newItem: Record<string, unknown>
) => {
  const singular: string = ModelSingular[resourceName] || "";
  const token = getAuthTokenFromCookie();
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/${singular}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(newItem),
    }
  );
  if (!response.ok || singular === "") {
    throw new Error(`Failed to create ${resourceName}`);
  }
  return response.json();
};

export const updateItem = async (
  resourceName: string,
  id: string,
  updatedItem: Record<string, unknown>
) => {
  const singular: string = ModelSingular[resourceName] || "";
  const token = getAuthTokenFromCookie();
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/${singular}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(updatedItem),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to update ${resourceName}`);
  }
  return response.json();
};

export const deleteItem = async (resourceName: string, id: string) => {
  const singular: string = ModelSingular[resourceName] || "";
  const token = getAuthTokenFromCookie();
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/${singular}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );
  if (!response.ok || singular === "") {
    throw new Error(`Failed to delete ${resourceName}`);
  }
  return response.json();
};
