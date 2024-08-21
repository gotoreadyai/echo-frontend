import { format, parseISO, isValid } from "date-fns";
import { ConfigType, FieldConfig } from "./Types";
import { listRelations } from "./RELATIONS";

interface RenderTableRowsProps {
  config: Record<string, FieldConfig>;
  handleSelect: (item: Record<string, any>) => void;
  handleRelation: (item: Record<string, any>) => void;
  model: string;
  data: Record<string, any> | null;
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
  const items = model && data ? data[model].items || [] : [];
  const handleDelete = (id: string) => deleteMutation.mutate(id);

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "yyyy-MM-dd HH:mm:ss") : dateString;
  };

  return (
    items.length &&
    items.map((item: Record<string, any>) => (
      <tr key={item.id}>
        {Object.keys(config as ConfigType).map((key) => {
          const value = item[key];
          const formattedValue =
            typeof value === "string" &&
            value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
              ? formatDate(value)
              : value;

          return (
            <td
              className="whitespace-nowrap text-ellipsis max-w-px overflow-hidden"
              key={key}
            >
              {formattedValue}
            </td>
          );
        })}
        <td key={`last`} className="gap-1 flex w-full  justify-end">
          <button
            className="btn btn-info btn-xs"
            onClick={() => handleSelect(item)}
          >
            Edit
          </button>
          {listRelations?.[model] &&
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
                add: {el}:{model}
              </button>
            ))}
          <button
            className="btn btn-error btn-xs"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  );
};
