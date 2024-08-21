export type FieldConfig = {
  type: string;
  allowNull: boolean;
  primaryKey?: boolean;
  references?: { model: string; key: string };
  onDelete?: string;
  onUpdate?: string;
  label?: string;
};

export type ConfigType = {
  [key: string]: FieldConfig;
};

export type CrudManagerParams = {
  workspace: string;
  model: string;
  action: string;
  related: string;
  id: string;
};

export type MutationSuccessHandler = () => void;
export type SelectedItem = Record<string, any> | null;

export const getInputType = (type: string) => {
  switch (type) {
    case "TEXT":
      return "textarea";
    case "STRING":
      return "text";
    case "UUID":
      return "text"; // Consider "hidden" if UUID should not be visible
    case "DATE":
      return "date";
    default:
      return "text";
  }
};
