/* eslint-disable @typescript-eslint/no-explicit-any */
import create from "zustand";

interface GlobalState {
  userData: Record<string, any>;
  filters: Record<string, any>;
  mainMessage: { message: string; type: string };
  globalScope: () => Record<string, any>;
  setUserData: (userData: Record<string, any>) => void;
  setFilters: (filters: Record<string, any>) => void;
  setMainMessage: (message: string, type: string) => void;
}

// Funkcja pomocnicza do przekształcenia płaskiego obiektu na zagnieżdżony
const unflatten = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const keys = key.split('.');
    keys.reduce((acc, currentKey, index) => {
      if (index === keys.length - 1) {
        acc[currentKey] = obj[key];
      } else {
        if (!acc[currentKey] || typeof acc[currentKey] !== 'object') {
          acc[currentKey] = {};
        }
      }
      return acc[currentKey];
    }, result);
  }

  return result;
};

// Funkcja pomocnicza do głębokiego łączenia obiektów
const deepMerge = (target: any, source: any): any => {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

export const useGlobalStore = create<GlobalState>((set, get) => ({
  userData: {},
  filters: {},

  mainMessage: {
    message: "",
    type: "info",
  },
  globalScope: () => {
    const { userData, mainMessage, filters } = get();
    return {
      userData: userData || {},
      mainMessage: mainMessage || {},
      filters: filters || {},
    };
  },
  setUserData: (userData) => set({ userData }),
  setFilters: (newFilters) => {
    const nestedFilters = unflatten(newFilters);
    const currentFilters = get().filters;
    const mergedFilters = deepMerge({ ...currentFilters }, nestedFilters);
    set({ filters: mergedFilters });
  },
  setMainMessage: (message, type) =>
    set({ mainMessage: { message, type } }),
}));
