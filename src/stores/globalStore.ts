/* eslint-disable @typescript-eslint/no-explicit-any */
import create from "zustand";

interface GlobalState {
  userData: Record<string, any>;
  relationsData: Record<string, any>;
  mainMessage: { message: string; type: string };
  globalScope: () => Record<string, any>;
  setUserData: (userData: Record<string, any>) => void;
  setMainMessage: (message: string, type: string) => void; // Add action to update mainMessage
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  userData: {},
  relationsData: {},
  mainMessage: {
    message: "",
    type: "info",
  },
  globalScope: () => {
    const { userData, relationsData,mainMessage } = get();
    return { userData: userData || {}, relationsData: relationsData || {}, mainMessage: mainMessage || {} };
  },
  setUserData: (userData) => set({ userData }),
  setMainMessage: (message, type) => set({ mainMessage: { message, type } }), // Action to update mainMessage
}));
