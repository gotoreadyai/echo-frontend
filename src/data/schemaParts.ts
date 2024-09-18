/* eslint-disable @typescript-eslint/no-explicit-any */
export const initBackgrounds: any = {
  "base-100": "bg-base-100",
  "base-200": "bg-base-200",
  "base-300": "bg-base-300",
  primary: "bg-primary",
  secondary: "bg-secondary",
  outerLights:
    "bg-[radial-gradient(60%_40%_at_40%_0%,oklch(var(--s)/0.1)_0%,oklch(var(--s)/0.15)_5%,oklch(var(--b1)/0.8)_100%)]",
};

export const backgroundSchemaPart: any = {
  type: "string",
  label: "Background",
  enum: [
    "",
    "base-100",
    "base-200",
    "base-300",
    "primary",
    "secondary",
    "outerLights",
  ],
};

export const actionsListSchemaPart: any = {
  type: "array",
  title: "Available actions",
  items: {
    type: "object",
    properties: {
      scope: {
        type: "string",
        enum: ["workspaces", "documents"],
        title: "Scope",
        default: "workspaces",
      },
      action: {
        type: "string",
        enum: [
          "",
          "AlertAction",
          "InsertAction",
          "UpdateAction",
          "DeleteAction",
          "SignInAction",
          "FetchItemsAction",
          "FilterScopeByIdAction",
        ],
        default: "",
        title: "Action",
      },
    },
  },
};
