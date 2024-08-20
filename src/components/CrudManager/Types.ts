export type FieldConfig = {
  type: string;
  allowNull: boolean;
  primaryKey?: boolean;
  references?: { model: string; key: string };
  onDelete?: string;
  onUpdate?: string;
};

export type ConfigType = {
  [key: string]: FieldConfig;
};

export type CrudManagerParams = {
  model: string;
  action: string;
};

export type MutationSuccessHandler = () => void;
export type SelectedItem = Record<string, any> | null;
