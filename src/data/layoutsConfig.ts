import React from "react";
import { LayoutConfig } from "../types/types";

export const layoutsConfig: Record<string, LayoutConfig> = {
  MainDashboard: {
    id: "MainDashboard",
    component: React.lazy(() => import("../layouts/MainDashboard")),
    slots: ["header", "primaryContent", "secondaryContent", "footer"], // Zdefiniowane sloty
    parentSlots: ["header", "footer"],
  },
  AuthLayout: {
    id: "AuthLayout",
    component: React.lazy(() => import("../layouts/AuthLayout")),
    slots: ["header"], // Zdefiniowane sloty
    parentSlots: ["header"],
  },
  layout2: {
    id: "layout2",
    component: React.lazy(() => import("../layouts/Layout2")),
    slots: ["header", "primaryContent", "secondaryContent", "footer"], // Zdefiniowane sloty
    parentSlots: ["header", "footer"],
  },
  LandingDoubleClasic:{
    id: "LandingDoubleClasic",
    component: React.lazy(() => import("../layouts/LandingDoubleClasic")),
    slots: ["header", "primaryContent", "secondaryContent", "tertiaryContent", "footer"], // Zdefiniowane sloty
    parentSlots: ["header", "footer"],
  }
};
