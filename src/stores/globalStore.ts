/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface GlobalState {
  user: Record<string, any>;
  filters: Record<string, any>;
  mainMessage: { message: string; type: string };
  globalScope: () => Record<string, any>;
  setUser: (user: Record<string, any>) => void;
  setFilters: (filters: Record<string, any>) => void;
  setMainMessage: (message: string, type: string) => void;
}

// Helper function to unflatten a flat object into a nested object
const unflatten = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const keys = key.split(".");
    keys.reduce((acc, currentKey, index) => {
      if (index === keys.length - 1) {
        acc[currentKey] = obj[key];
      } else {
        if (!acc[currentKey] || typeof acc[currentKey] !== "object") {
          acc[currentKey] = {};
        }
      }
      return acc[currentKey];
    }, result);
  }

  return result;
};

// Helper function to deeply merge objects
const deepMerge = (target: any, source: any): any => {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      if (!target[key] || typeof target[key] !== "object") {
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
  user: {},
  filters: {},
  mainMessage: {
    message: "",
    type: "info",
  },
  globalScope: () => {
    const { user, mainMessage, filters } = get();
    return {
      user: user || {},
      mainMessage: mainMessage || {},
      filters: filters || {},
    };
  },
  setUser: (user) => set({ user }),
  setFilters: (newFilters) => {
    const nestedFilters = unflatten(newFilters);
    const currentFilters = get().filters;
    const mergedFilters = deepMerge({ filters: currentFilters }, nestedFilters);

    set(mergedFilters);
  },
  setMainMessage: (message, type) => set({ mainMessage: { message, type } }),
}));
