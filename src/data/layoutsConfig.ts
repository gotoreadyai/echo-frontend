import React from "react";
import { LayoutConfig } from "../types/types";

export const layoutsConfig: Record<string, LayoutConfig> = {
  MainDashboard: {
    id: "MainDashboard",
    component: React.lazy(() => import("../layouts/MainDashboard")),
    slots: ["header", "primaryContent", "secondaryContent", "footer"], // Zdefiniowane sloty
    parentSlots: ["header", "footer"],
  },
  layout2: {
    id: "layout2",
    component: React.lazy(() => import("../layouts/Layout2")),
    slots: ["header", "primaryContent", "footer"], // Zdefiniowane sloty
    parentSlots: ["header", "footer"],
  },
};
