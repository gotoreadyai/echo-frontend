import { format, parseISO, isValid } from "date-fns";
import { ConfigType, FieldConfig } from "./Types";
import { listRelations } from "./RELATIONS";
import { FiEdit3, FiList, FiTrash2 } from "react-icons/fi";

interface RenderTableRowsProps {
  config: Record<string, FieldConfig>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelect: (item: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRelation: (item: Record<string, any>) => void;
  model: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteMutation: any;
}

export const RenderTableRows = ({
  config,
  handleSelect,
  handleRelation,
  model,
  data,
  deleteMutation,
}: RenderTableRowsProps) => {
  const items = model && data?.[model]?.items ? data[model].items : [];

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "yyyy-MM-dd / HH:mm") : dateString;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCellValue = (item: Record<string, any>, key: string) => {
    const value = item[key];

    if (
      typeof value === "string" &&
      value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    ) {
      return formatDate(value);
    }

    if (Array.isArray(value)) {
      return <span className="badge">{value.join(", ")}</span>;
    }

    if (typeof value === "object" && value !== null) {
      return <span className="badge">{JSON.stringify(value)}</span>;
    }

    return value !== undefined ? value : "N/A";
  };

  return items.length ? (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items.map((item: Record<string, any>) => (
      <tr key={item.id || Math.random()}>
        {Object.keys(config as ConfigType).map((key) => (
          <td
            className="whitespace-nowrap text-ellipsis max-w-px overflow-hidden"
            key={key}
          >
            {getCellValue(item, key)}
          </td>
        ))}
        <td key={`last`} className="gap-1 flex w-full justify-end">
          <button
            className="btn btn-info btn-xs"
            onClick={() => handleSelect(item)}
          >
           <FiEdit3 /> Edit
          </button>
          {listRelations?.[model] &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            listRelations[model].map((el: any) => (
              <button
                key={`${el}:${model}`}
                onClick={() => {
                  handleRelation({
                    ...item,
                    _relatedFrom: el,
                    _relatedTo: model,
                  });
                }}
                className="btn btn-outline btn-xs"
              >
               <FiList /> {el}
              </button>
            ))}
          <button
            className="btn btn-error btn-xs"
            onClick={() => handleDelete(item.id)}
          >
            <FiTrash2 /> Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr className="p-md text-base-content bg-base-200 flex-1">
      <td colSpan={Object.keys(config).length + 1}>no items</td>
    </tr>
  );
};
