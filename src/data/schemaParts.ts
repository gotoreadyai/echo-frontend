/* eslint-disable @typescript-eslint/no-explicit-any */
export const initBackgrounds: any = {
  "base-100": "bg-base-100",
  "base-200": "bg-base-200",
  "base-300": "bg-base-300",
  primary: "bg-primary",
  secondary: "bg-secondary",
  outerLights:
    "bg-[radial-gradient(50%_70%_at_60%_10%,oklch(var(--s)/0.3)_0%,oklch(var(--s)/0.3)_10%,oklch(var(--b1)/0.8)_100%)]",
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
  title: "Avilable actions",
  items: {
    type: "string",
    default: "",
    enum: ["", "AlertAction", "InsartAction", "SignInAction"],
  },
}
