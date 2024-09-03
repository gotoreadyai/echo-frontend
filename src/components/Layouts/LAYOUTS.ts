export type slots = string[];
export const LAYOUTS: Record<
  string,
  { name: string; withPages: boolean; slots: slots }
> = {
  MainDashboard: {
    name: "MainDashboard",
    withPages: false,
    slots: ["primary", "form"],
  },
  OneColumn: { name: "OneColumn", withPages: true, slots: ["primary"] },
  TwoColumns: {
    name: "TwoColumns",
    withPages: true,
    slots: ["primary", "form"],
  },
  OneColumnForm: {
    name: "OneColumnForm",
    withPages: true,
    slots: ["primary", "form"],
  },
};
