import { BlocksRenderer } from "../Blocks/BlocksRenderer";
import { Block } from "../Blocks/Types";
import { FieldConfig } from "./Types";

interface RenderFormFieldsProps<T> {
  config: Record<string, FieldConfig>;
  selectedItem: T | null;
  setSelectedItem: (item: T | null) => void;
  relatedOptions?: Record<string, { value: string; label: string }[]>;
}

export const RenderFormFields = <
  T extends Record<string, string | number | boolean | null>
>({
  config,
  selectedItem,
  setSelectedItem,
}: RenderFormFieldsProps<T>) => {
  if (!config) return null;

  const handleInputChange = (key: keyof T, value: T[keyof T]) => {
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        [key]: value,
      });
    }
  };

  const createBlockData = (
    key: keyof T,
    fieldConfig: FieldConfig,
    value: T[keyof T] | undefined
  ) => {
    const { type, allowNull, label, references } = fieldConfig;
    const isRequired = !allowNull;
    const fieldLabel = label ?? (key as string);

    const finalValue = value !== undefined ? value : ("" as T[keyof T]); // Zapewnienie wartości domyślnej

    if (references) {
      return {
        id: key as string,
        type: "formRelationInput",
        data: {
          id: key as string,
          label: fieldLabel,
          value: finalValue,
          isRequired,
          onChange: (newValue: string) =>
            handleInputChange(key, newValue as T[keyof T]),
        },
      };
    }

    if (type === "TEXT") {
      return {
        id: key as string,
        type: "formTextarea",
        data: {
          id: key as string,
          label: fieldLabel,
          value: finalValue,
          isRequired,
          onChange: (newValue: string) =>
            handleInputChange(key, newValue as T[keyof T]),
        },
      };
    }

    if (type === "JSONB") {
      return {
        id: key as string,
        type: "formJSONInput",
        data: {
          id: key as string,
          label: fieldLabel,
          value: finalValue,
          isRequired,
          onChange: (newValue: string) =>
            handleInputChange(key, newValue as T[keyof T]),
        },
      };
    }

    return {
      id: key as string,
      type: "formTextInput",
      data: {
        id: key as string,
        label: fieldLabel,
        value: finalValue,
        isRequired,
        onChange: (newValue: string) =>
          handleInputChange(key, newValue as T[keyof T]),
      },
    };
  };

  const blocks = Object.entries(config)
    .filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key))
    .map(([key, fieldConfig]) =>
      createBlockData(
        key as keyof T,
        fieldConfig,
        selectedItem?.[key as keyof T]
      )
    );

  return (
    <>
      {blocks.map((value) => (
        <BlocksRenderer key={value.id} block={value as Block} />
      ))}
    </>
  );
};
