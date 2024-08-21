import { TextInput, Textarea, RelationInput } from "./FormComponents";
import { FieldConfig, getInputType } from "./Types";

interface RenderFormFieldsProps {
  config: Record<string, FieldConfig>;
  selectedItem: Record<string, any> | null;
  setSelectedItem: (item: Record<string, any>) => void;
  relatedOptions?: Record<string, { value: string; label: string }[]>;
}

export const RenderFormFields = ({
  config,
  selectedItem,
  setSelectedItem,
  relatedOptions = {},
}: RenderFormFieldsProps) => {
  if (!config) return null;

  const handleInputChange = (key: string, value: any) => {
    setSelectedItem((prevSelectedItem: Record<string, any> | null) => ({
      ...(prevSelectedItem ?? {}),
      [key]: value,
    }));
  };

  const renderField = (
    key: string,
    fieldConfig: FieldConfig,
    value: any,
    relatedOptions: Record<string, { value: string; label: string }[]>
  ) => {
    const { type, allowNull, label, references } = fieldConfig;
    const inputType = getInputType(type);
    const isRequired = !allowNull;
    const fieldLabel = label ?? key;

    if (references) {
      return (
        // <SelectInput
        //   key={key}
        //   id={key}
        //   label={fieldLabel}
        //   value={value || ""}
        //   onChange={(value) => handleInputChange(key, value)}
        //   options={relatedOptions[key] || []}
        //   isRequired={isRequired}
        // />
        <RelationInput
        key={key}
        id={key}
        label={fieldLabel}
        value={value || ""}
        onChange={(value) => handleInputChange(key, value)}
        isRequired={isRequired}
      />
      );
    }

    if (inputType === "textarea") {
      return (
        <Textarea
          key={key}
          id={key}
          label={fieldLabel}
          value={value || ""}
          onChange={(value) => handleInputChange(key, value)}
          isRequired={isRequired}
        />
      );
    }

    return (
      <TextInput
        key={key}
        id={key}
        label={fieldLabel}
        value={value || ""}
        onChange={(value) => handleInputChange(key, value)}
        isRequired={isRequired}
      />
    );
  };

  return (
    <>
      {Object.entries(config)
        .filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key))
        .map(([key, fieldConfig]) =>
          renderField(key, fieldConfig, selectedItem?.[key], relatedOptions)
        )}
    </>
  );
};
