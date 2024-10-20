import React from "react";
import { LayoutConfig } from "../types/types";


export const layoutsConfig: Record<string, LayoutConfig> = {
  MainDashboard: {
    id: "MainDashboard",
    component: React.lazy(() => import("../layouts/MainDashboard")),
    slots: [
      "header",
      "primaryContent",
      "secondaryContent",
      "tertiaryContent",
      "footer",
    ],
    parentSlots: ["header", "footer"],
  },
  AuthLayout: {
    id: "AuthLayout",
    component: React.lazy(() => import("../layouts/AuthLayout")),
    slots: [
      "header",
      "primaryContent",
      "secondaryContent",
      "tertiaryContent",
      "footer",
    ],
    parentSlots: ["header", "footer"],
  },
  LandingDoubleClassic: {
    id: "LandingDoubleClassic",
    component: React.lazy(() => import("../layouts/LandingDoubleClassic")),
    slots: [
      "header",
      "primaryContent",
      "secondaryContent",
      "tertiaryContent",
      "footer",
    ],
    parentSlots: ["header", "footer"],
  },
  SideLayout: {
    id: "SideLayout",
    component: React.lazy(() => import("../layouts/SideLayout")),
    slots: ["_sideStatic"],
    parentSlots: [],
  },
};
