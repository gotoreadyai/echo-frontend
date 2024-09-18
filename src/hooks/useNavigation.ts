/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useNavigate,
  useSearchParams,
  NavigateFunction,
} from "react-router-dom";
import { useMemo } from "react";

// Definicja interfejsu dla hooka
export interface Navigation {
  getUSParam: (param: string) => string | null;
  setUSParam: (param: string, value: string) => void;
  upSParams: (queryString: string) => void;
  removeUSParam: (param: string) => void;
  navigateTo: (path: string) => void;
  getAll: () => Record<string, string>; // Zmieniony typ zwracany
}

const useNavigation = (): Navigation => {
  const navigate: NavigateFunction = useNavigate();
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
   * Nawigacja do określonej ścieżki
   * @param path - Pełna ścieżka URL, do której ma nastąpić nawigacja
   */
  const navigateTo = (path: string): void => {
    navigate(path);
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
    return paramsObject;
  };

  return useMemo(
    () => ({
      getUSParam,
      setUSParam,
      upSParams,
      removeUSParam,
      navigateTo,
      getAll, // Dodanie getAll do zwracanych funkcji
    }),
    [searchParams, navigate]
  );
};

export default useNavigation;

export const parseKeyFromPath = (path: string, item: any) => {
  return path.replace(/{(\w+)}/g, (_, key: string) => item[key] || `{${key}}`);
};
