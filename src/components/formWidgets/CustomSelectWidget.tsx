import { WidgetProps } from "@rjsf/utils";
import { ChangeEvent } from "react";

interface EnumOption {
  value: string;
  label: string;
}

export const CustomSelectWidget = (props: WidgetProps) => {
  const {
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    rawErrors = [],
  } = props;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    onChange(value === "" ? options.emptyValue : value);
  };
  const isRootLevel = id.split("_");
  return (
    <div
      className={`my-select-wrapper p-xs bg-base-100 ${
        isRootLevel.length === 2 ? "bg-base-200" : ""
      }`}
    >
      <select
        id={id}
        className="select select-bordered w-full"
        value={value || ""}
        required={required}
        disabled={disabled || readonly}
        autoFocus={autofocus}
        onChange={handleChange}
        onBlur={onBlur && ((event) => onBlur(id, event.target.value))}
        onFocus={onFocus && ((event) => onFocus(id, event.target.value))}
      >
        {/* Placeholder */}
        {placeholder && <option value="">{placeholder}</option>}

        {/* Opcje select */}
        {(options.enumOptions || []).map(
          ({ value, label }: EnumOption, i: number) => (
            <option key={i} value={value}>
              {label}
            </option>
          )
        )}
      </select>

      {rawErrors.length > 0 && (
        <div className="text-red-600 text-sm mt-2">{rawErrors.join(", ")}</div>
      )}
    </div>
  );
};
