import { WidgetProps } from "@rjsf/utils";
import { ChangeEvent } from "react";

export const CustomCheckboxWidget = (props: WidgetProps) => {
    const {
      id,
      value,
      required,
      disabled,
      readonly,
      autofocus,
      onChange,
      onBlur,
      onFocus,
      label,
      rawErrors = [],
    } = props;
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      onChange(checked);
    };
  
    return (
      <div className="relative flex items-center px-sm py-xs">
        <input
          type="checkbox"
          id={id}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          checked={!!value}
          required={required}
          disabled={disabled || readonly}
          autoFocus={autofocus}
          onChange={handleChange}
          onBlur={onBlur && ((event) => onBlur(id, event.target.checked))}
          onFocus={onFocus && ((event) => onFocus(id, event.target.checked))}
        />
        {label && (
          <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
            {label}
            {required && <span className="text-danger">*</span>}
          </label>
        )}
        {rawErrors.length > 0 && (
          <div className="text-red-600 text-sm mt-1">{rawErrors.join(", ")}</div>
        )}
      </div>
    );
  };