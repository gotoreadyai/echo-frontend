import { FieldConfig } from "./Types";

export const RenderTableHeaders = ({ config }: Record<string, FieldConfig>) => {
  if (!config) return null;

  return (
    <>
      {Object.keys(config).map((key) => (
        <th key={key}>{key}</th>
      ))}
      <th className="text-right w-1/4">Actions</th>
    </>
  );
};
