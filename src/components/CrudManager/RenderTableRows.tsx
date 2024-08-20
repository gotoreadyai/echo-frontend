import { ConfigType, FieldConfig } from "./Types";

interface RenderTableRowsProps {
  config: Record<string, FieldConfig>;
  handleSelect: (item: Record<string, any>) => void;
  model: string;
  data: Record<string, any> | null;
  deleteMutation: any;
}

export const RenderTableRows = ({
  config,
  handleSelect,
  model,
  data,
  deleteMutation,
}: RenderTableRowsProps) => {
  const items = model && data ? data[model] || [] : [];
  const handleDelete = (id: string) => deleteMutation.mutate(id);

  return items.map((item: Record<string, any>) => (
    <tr key={item.id}>
      {Object.keys(config as ConfigType).map((key) => (
        <td
          className="whitespace-nowrap text-ellipsis max-w-px overflow-hidden"
          key={key}
        >
          {item[key]}
        </td>
      ))}
      <td className="gap-1 flex">
        <button
          className="btn btn-info btn-xs"
          onClick={() => handleSelect(item)}
        >
          Edit
        </button>
        <button
          className="btn btn-error btn-xs"
          onClick={() => handleDelete(item.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
};
