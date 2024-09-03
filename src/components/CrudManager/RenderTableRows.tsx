import { format, parseISO, isValid } from "date-fns";
import { ConfigType, FieldConfig } from "./Types";
import { listActions } from "./ACTIONS";
import { FiEdit3,  FiList, FiTrash2 } from "react-icons/fi";

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
            className="whitespace-nowrap text-ellipsis max-w-px overflow-hidden text-left p-2"
            key={key}
          >
            {getCellValue(item, key)}
          </td>
        ))}
        <td key={`last`} className="flex justify-end space-x-2 p-2">
          <button
            className="btn btn-info btn-xs flex items-center"
            onClick={() => handleSelect(item)}
          >
            <FiEdit3 className="mr-1" /> Edit
          </button>
          {listActions?.[model] &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            listActions[model].map((el: any) => (
              <button
                key={`${el.toString()}:${model}`}
                onClick={() => {
                  const [key, value] = Object.entries(el)[0];
                  console.log(key, value);
                  if (key === 'relation') {
                    handleRelation({
                      ...item,
                      _relatedFrom: value,
                      _relatedTo: model,
                    });
                  }
                }}
                className="btn btn-outline btn-xs flex items-center"
              >
                 {Object.keys(el)[0] === 'relation' && <FiList className="mr-1" /> }
                 {/* {Object.keys(el)[0] === 'preview' && <FiEye className="mr-1" /> } */}
                 {el[Object.keys(el)[0]]}
              </button>
            ))}
          <button
            className="btn btn-error btn-xs flex items-center"
            onClick={() => handleDelete(item.id)}
          >
            <FiTrash2 className="mr-1" /> Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr className="p-md text-base-content bg-base-200">
      <td colSpan={Object.keys(config).length + 1} className="text-center p-2">
        No items
      </td>
    </tr>
  );
};
