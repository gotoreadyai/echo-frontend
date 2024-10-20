/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalStore } from "../stores";
import { NavigationOptions } from "../types/actionsTypes";

const useNav = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setFilters = useGlobalStore((state) => state.setFilters);

  // Funkcja do modyfikacji parametrów zapytania
  const modifySearchParams = (
    searchParams: URLSearchParams,
    newParams: Record<string, any>,
    allowMany: boolean
  ) => {
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        !allowMany && searchParams.delete(key);
        (allowMany || !searchParams.has(key)) &&
          searchParams.append(key, String(value));
      } else {
        searchParams.delete(key);
      }
    });
  };

  // Poprawiona funkcja buildLink
  const buildLink = (to: string, options?: NavigationOptions): string => {
    const allowMany = options?.allowMany ?? false;
    const newSearchParams = options?.clearQueryString
      ? new URLSearchParams()
      : new URLSearchParams(searchParams);

    // Rozdziel ścieżkę na czystą część i istniejące parametry zapytania
    const [cleanPath, query] = to.split("?");

    // Jeśli istnieją parametry w URL, dodaj je do newSearchParams
    if (query) {
      const existingParams = new URLSearchParams(query);
      existingParams.forEach((value, key) => {
        !allowMany && newSearchParams.delete(key);
        allowMany || !newSearchParams.has(key);
        newSearchParams.append(key, value);
      });
    }

    // Dodaj nowe parametry zapytania z options.queryParams
    options?.queryParams &&
      modifySearchParams(newSearchParams, options.queryParams, allowMany);

    // Usunięcie parametrów, jeśli są podane w clearParams
    options?.clearParams &&
      options.clearParams.forEach((param) => newSearchParams.delete(param));

    // Budowanie nowego linku z nowymi parametrami zapytania
    const queryString = newSearchParams.toString();
    return queryString ? `${cleanPath}?${queryString}` : cleanPath;
  };

  const navigateTo = (to: string, options?: NavigationOptions) => {
    const newPath = buildLink(to, options);

    if (options?.queryParams) {
      const filterParams = Object.entries(options.queryParams)
        .filter(([key, value]) => key.startsWith("filters.") && value)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      if (Object.keys(filterParams).length) setFilters(filterParams);
    }

    navigate(newPath);
  };

  const getAll = () => Object.fromEntries(searchParams.entries());

  const getUSParam = (param: string, defaultValue: string | null = null) =>
    searchParams.get(param) || defaultValue;

  return { buildLink, navigateTo, getAll, getUSParam };
};

export default useNav;
