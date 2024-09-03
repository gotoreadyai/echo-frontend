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
    console.log(key, value);

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
    const fieldLabel = label ?? String(key);

    // Zapewnienie domyślnej wartości dla `value`, jeśli jest `undefined` lub `null`
    const finalValue = value !== undefined && value !== null ? value : "";

    if (references) {
      return {
        id: String(key),
        type: "formRelationInput",
        data: {
          id: String(key),
          label: fieldLabel,
          value: String(finalValue), // Zakładając, że wartość jest stringiem
          isRequired,
          onChange: (newValue: string) =>
            handleInputChange(key, newValue as T[keyof T]),
        },
      };
    }

    if (type === "TEXT") {
      return {
        id: String(key),
        type: "formTextarea",
        data: {
          id: String(key),
          label: fieldLabel,
          value: String(finalValue), // Zakładając, że wartość jest stringiem
          isRequired,
          onChange: (newValue: string) =>
            handleInputChange(key, newValue as T[keyof T]),
        },
      };
    }

    if (type === "JSONB") {
      return {
        id: String(key),
        type: "formJSONInput",
        data: {
          id: String(key),
          label: fieldLabel,
          value: finalValue, // Zakładając, że wartość jest obiektem JSON
          isRequired,
          onChange: (newValue: object) =>
            handleInputChange(key, newValue as unknown as T[keyof T]),
        },
      };
    }

    // Domyślnie używamy inputu tekstowego
    return {
      id: String(key),
      type: "formTextInput",
      data: {
        id: String(key),
        label: fieldLabel,
        value: String(finalValue), // Konwertujemy na string, jeśli to konieczne
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
      {blocks.map((block) => {
        return <BlocksRenderer key={block.id} block={block as Block} />;
      })}
    </>
  );
};
