/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { layoutsConfig } from "../data/layoutsConfig";

const cache: Record<string, <T>(state: any) => T> = {};

export const getGetterByPath = (
  path: string
): (<T>(state: any) => T | undefined) => {
  if (!path || path.endsWith(".")) {
    return () => undefined;
  }

  if (!cache[path]) {
    cache[path] = (object: any) => {
      try {
        return path
          .split(".")
          .reduce((acc, key) => (acc ? acc[key] : undefined), object);
      } catch {
        return undefined;
      }
    };
  }

  return cache[path];
};

const setDeep = (obj: any, path: string[], value: any) => {
  return path.reduceRight((acc, key, i) => {
    if (isNaN(Number(key))) {
      return {
        ...getGetterByPath(path.slice(0, i).join("."))(obj),
        [key]: acc,
      };
    }
    const arr = getGetterByPath(path.slice(0, i).join("."))(obj) || [];
    (arr as any[])[Number(key)] = acc;
    return arr;
  }, value);
};

interface PageState {
  pageData: Record<string, any>;
  loading: Record<string, boolean>;
  initialScope: Record<string, any>;
  selectedLayoutName: string;
  setSelectedLayoutName: (layoutName: string) => void;
  updateField: (path: string, value: any) => void;
  getFieldValue: (path: string) => any;
  resetPage: () => void;
  setLoading: (path: string, isLoading: boolean) => void;
  setPageData: (data: Record<string, any>) => void;

}

export const usePageStore = create<PageState>((set, get) => ({
  workspaceData: {},
  pageData: {},
  initialScope: {},
  loading: {},
  selectedLayoutName: Object.keys(layoutsConfig)[0],
  setLoading: (path, isLoading) =>
    set((state) => ({
      loading: { ...state.loading, [path]: isLoading },
    })),

  setSelectedLayoutName: (layoutName) => {
    set((state) => ({
      selectedLayoutName: layoutName,
      pageData: {
        ...state.pageData,
        layout: layoutName,
      },
    }));
  },

  setPageData: (data) => set({ pageData: data }),


  updateField: (path: string, value: any) => {
    const pageDataCopy = { ...get().pageData };
    const updatedData = setDeep(pageDataCopy, path.split("."), value);
    set({ pageData: { ...pageDataCopy, ...updatedData } });
  },

  getFieldValue: (path: string) => getGetterByPath(path)(get().pageData) ?? "",

  resetPage: () => set({ pageData: {} }),
}));
