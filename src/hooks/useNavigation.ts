/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useNavigate,
  useSearchParams,
  NavigateFunction,
  useParams,
} from "react-router-dom";
import { useMemo } from "react";
import { getGetterByPath } from "../stores/pageStore";
import { PathParams } from "../types/types";

// Definicja interfejsu dla hooka
export interface Navigation {
  getUSParam: (param: string) => string | null;
  setUSParam: (param: string, value: string) => void;
  upSParams: (queryString: string) => void;
  removeUSParam: (param: string) => void;
  navigateTo: (path: string, prevent?: boolean) => void;
  getAll: () => Record<string, string>;
  getSearchString: () => string; // Dodane getSearchString
}

const useNavigation = (): Navigation => {
  const navigate: NavigateFunction = useNavigate();
  const { workspace, slug, action } = useParams<PathParams>();
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Aktualizacja parametrów wyszukiwania za pomocą funkcji callback
   * @param callback - Funkcja modyfikująca URLSearchParams
   */
  const updateSearchParams = (callback: (params: URLSearchParams) => void) => {
    const newSearchParams = new URLSearchParams(searchParams);
    callback(newSearchParams);
    setSearchParams(newSearchParams, { replace: true });
  };

  /**
   * Pobranie wartości pojedynczego parametru
   * @param param - Nazwa parametru
   * @returns Wartość parametru lub null, jeśli nie istnieje
   */
  const getUSParam = (param: string): string | null => searchParams.get(param);

  /**
   * Ustawienie wartości pojedynczego parametru
   * @param param - Nazwa parametru
   * @param value - Wartość do ustawienia
   */
  const setUSParam = (param: string, value: string): void => {
    updateSearchParams((params) => {
      params.set(param, value);
    });
  };

  /**
   * Aktualizacja wielu parametrów na podstawie query string
   * @param queryString - String zawierający parametry, np. "key1=value1&key2=value2"
   */
  const upSParams = (queryString: string): void => {
    const newParams = new URLSearchParams(queryString);
    updateSearchParams((params) => {
      newParams.forEach((value, key) => {
        params.set(key, value);
      });
    });
  };

  /**
   * Usunięcie pojedynczego parametru
   * @param param - Nazwa parametru do usunięcia
   */
  const removeUSParam = (param: string): void => {
    updateSearchParams((params) => {
      params.delete(param);
    });
  };

  /**
   * Nawigacja do określonej ścieżki z opcjonalnym zachowaniem query string
   * @param path - Pełna ścieżka URL, do której ma nastąpić nawigacja
   * @param prevent - Jeśli true, query string nie zostanie dodany
   */
  const navigateTo = (path: string, prevent = false): void => {
    navigate({
      pathname: path,
      search: !prevent ? `?${searchParams.toString()}` : undefined,
    });
  };

  /**
   * Pobiera bieżący query string z dodanym znakiem '?'
   * @returns Query string, np. "?param1=wartość1&param2=wartość2"
   */
  const getSearchString = (): string => {
    const str = searchParams.toString();
    return str ? `?${str}` : "";
  };

  /**
   * Pobranie wszystkich parametrów wyszukiwania jako obiekt kluczy i wartości
   * @returns Obiekt zawierający wszystkie pary klucz-wartość parametrów
   */
  const getAll = (): Record<string, string> => {
    const paramsObject: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObject[key] = value;
    });
    return {
      ...paramsObject,
      "filters._action": action ?? "",
      "filters._workspace": workspace ?? "",
      "filters._slug": slug ?? "",
    };
  };

  return useMemo(
    () => ({
      getUSParam,
      setUSParam,
      upSParams,
      removeUSParam,
      navigateTo,
      getAll,
      getSearchString, // Dodajemy getSearchString do zwracanych funkcji
    }),
    [searchParams, navigate]
  );
};

export default useNavigation;

export const parseKeyFromPath = (path: string, item: any) => {
  return path.replace(/{([^}]+)}/g, (_, key: string) => {
    const getter = getGetterByPath(key);
    const value = getter(item);
    return value?.toString() ?? `{${key}}`;
  });
};
