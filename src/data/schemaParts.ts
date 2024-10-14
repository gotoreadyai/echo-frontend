import { ModelSingular } from "../../models_EXPORT/models";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initBackgrounds: any = {
  "base-100": "bg-base-100",
  "base-200": "bg-base-200",
  "base-300": "bg-base-300",
  primary: "bg-primary",
  secondary: "bg-secondary",
  pointPrimaryLightRight:
    "bg-[radial-gradient(50%_70%_at_90%_100%,oklch(var(--p)/0.2)_0%,oklch(var(--p)/0.2)_10%,oklch(var(--b2)/0.7)_100%)]",
  outerLights:
    "bg-[radial-gradient(60%_40%_at_40%_0%,oklch(var(--s)/0.1)_0%,oklch(var(--s)/0.1)_5%,oklch(var(--b1)/0.1)_100%)]",
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
      action: {
        label: "Akcja oraz scope",
        type: "string",
        enum: [
          "",
          "AlertAction",
          "InsertAction",
          "UpdateAction",
          "DeleteAction",
          "SignInAction",
          "FetchItemAction",
          "FetchItemsAction",
          "FilterScopeByIdAction",
          "CallToAiAction",
        ],
        default: "",
        title: "Action",
      },
      scope: {
        type: "string",
        title: "Scope",
        default: "",
      },
    },
    allOf: [
      {
        if: {
          properties: {
            action: {
              enum: [
                "InsertAction",
                "UpdateAction",
                "DeleteAction",
                "FetchItemAction",
                "SignInAction",
              ],
            },
          },
          required: ["action"],
        },
        then: {
          properties: {
            scope: {
              enum: ["", ...(ModelSingular ? Object.values(ModelSingular) : [])],
            },
          },
        },
        else: {
          properties: {
            scope: {
              enum: ["", ...(ModelSingular ? Object.keys(ModelSingular) : [])],
            },
          },
        },
      },
    ],
  },
};

export const textVariantsSchemaPart: any = {
  type: "string",
  label: "Text Variant",
  enum: ["", "hero", "leed", "info"],
};

