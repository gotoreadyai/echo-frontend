import { ReactNode } from "react";
import { create } from "zustand";

export type msgT = "error" | "success" | "info" | "warning";
export type msgBT = {
  type: msgT;
  content: string;
};
export type ThemeStore = {
  trashConfirm: number | null;
  breakPoint: string;
  modal: { bodyTarget: ReactNode | null };
  dropdown: boolean;
  contextBar: null | "user" | "local" | "subcontext" | "notification";
  sideBar: {
    mobile: boolean;
    short: boolean;
  };
  aiCall: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tool_calls: any;
    state: "" | "prepare_props" | "waiting" | "response" | "finish";
    propPath: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bulked:any[]
  };
  structure: {
    shoolObjective: string;
    shoolLevel: {
      groundA: boolean;
      groundB: boolean;
      highA: boolean;
      highB: boolean;
    };
  };
  user: {
    firstName: string;
    lastName: string;
  };
  cinematic:{
    state:boolean
  }
};

export const useThemeStore = create<ThemeStore>(() => ({
  breakPoint: "sm",
  sideBar: {
    mobile: false,
    short: false,
  },
  contextBar: "subcontext",
  trashConfirm: null,
  dropdown: false,
  modal: {
    bodyTarget: null,
  },
  aiCall: {
    payload: {},
    tool_calls: {},
    state: "",
    propPath: "",
    bulked:[]
  },
  structure: {
    shoolObjective: "jpol",
    shoolLevel: {
      groundA: true,
      groundB: false,
      highA: false,
      highB: false,
    },
  },
  user: {
    firstName: "",
    lastName: "",
  },
  cinematic:{
    state:false
  }
}));
