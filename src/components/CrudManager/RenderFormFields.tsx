import { FieldConfig } from "./Types";

const getInputType = (type: string) => {
  switch (type) {
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

interface RenderFormFieldsProps {
  config: Record<string, FieldConfig>;
  selectedItem: Record<string, any> | null;
  setSelectedItem: (item: Record<string, any>) => void;
}

export const RenderFormFields = ({
  config,
  selectedItem,
  setSelectedItem,
}: RenderFormFieldsProps) => {
  if (!config) return null;

  return Object.entries(config).map(([key, fieldConfig]) => {
    const typedFieldConfig = fieldConfig as FieldConfig;
    if (["id", "createdAt", "updatedAt"].includes(key)) return null;

    const inputType = getInputType(typedFieldConfig.type);

    return (
      <div key={key} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {key}
        </label>
        <input
          type={inputType}
          placeholder={key}
          value={selectedItem?.[key] || ""}
          onChange={(e) =>
            setSelectedItem({ ...selectedItem!, [key]: e.target.value })
          }
          className="input input-bordered w-full"
        />
      </div>
    );
  });
};
