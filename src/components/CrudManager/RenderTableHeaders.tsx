import { FieldConfig } from "./Types";

export const RenderTableHeaders = ({ config }: Record<string, FieldConfig>) => {
  if (!config) return null;

  return (
    <>
      {Object.keys(config).map((key, index) => (
        <th
          key={key}
          className={`
            ${(index === 0 || key === "title" || key === "content" || key === "name") ? "text-left" : "text-center"}
            ${(key === "title" ) && ""}
            ${(key === "content" ) && ""}
          `}
        >
          {key}
        </th>
      ))}
      <th className="text-right w-1/4">Actions</th>
    </>
  );
};
