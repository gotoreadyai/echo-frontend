import { ArrayFieldTemplateProps } from "@rjsf/utils";

export function ArrayFieldTemplateDashboard(props: ArrayFieldTemplateProps) {
  const { canAdd, items, onAddClick, title } = props;

  return (
    <div className="py-xs">
      {items.map((element, index) => (
        <div
          key={index}
          className="m-xs border border-base-300 rounded bg-base-200 px-xs pt-md"
        >
          <div className="border-base-content border-opacity-70">
            {element.children}
          </div>
          <div className="flex justify-end gap-1 p-sm">
            {element.hasMoveUp && (
              <button
                type="button"
                aria-label="Move up"
                className="btn btn-xs btn-outline"
                onClick={element.onReorderClick(
                  element.index,
                  element.index - 1
                )}
              >
                Move Up
              </button>
            )}
            {element.hasMoveDown && (
              <button
                aria-label="Move Down"
                type="button"
                className="btn btn-xs btn-outline"
                onClick={element.onReorderClick(
                  element.index,
                  element.index + 1
                )}
              >
                Move Down
              </button>
            )}
            {element.hasRemove && (
              <button
                aria-label="Remove"
                type="button"
                className="btn btn-xs btn-danger"
                onClick={element.onDropIndexClick(element.index)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}

      {canAdd && (
        <div className="border bg-base-100 border-base-300 m-xs rounded p-xs  ">
          <button
            aria-label="Add item"
            type="button"
            className="btn btn-outline btn-primary btn-md w-full no-animation"
            onClick={onAddClick}
          >
            Add {title} item
          </button>
        </div>
      )}
    </div>
  );
}
