/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, InputHTMLAttributes } from "react";

import {
  ArrayFieldTemplateItemType,
  ArrayFieldTemplateProps,
  BaseInputTemplateProps,
  DescriptionFieldProps,
  FieldTemplateProps,
  getInputProps,
  WidgetProps,
} from "@rjsf/utils";

export const TitleFieldTemplate = () => {
  return null; // Return null to hide the title
};

export const BaseInputTemplate = (props: BaseInputTemplateProps) => {
  const {
    schema,
    id,
    options,
    value,
    type,
    placeholder,
    required,
    disabled,
    readonly,
    autofocus,
    /* this is unused props to xixed browser errors on this lib */
    formContext,
    hideError,
    hideLabel,
    uiSchema,
    rawErrors,
    /* ! this is unused props to xixed browser errors on this lib */
    onChange,
    onChangeOverride,

    ...rest
  } = props;
  const onTextChange = ({
    target: { value: val },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(val === "" ? options.emptyValue || "" : val);
  };

  const inputProps = {
    ...rest,
    ...getInputProps(schema, type, options),
  } as unknown as InputHTMLAttributes<HTMLInputElement>;
  return (
    <div className="p-xs">
      <input
        id={id}
        className="w-full input input-bordered"
        autoFocus={autofocus}
        value={value}
        onChange={onChangeOverride || onTextChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        required={required}
        {...inputProps}
      />
    </div>
  );
};

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

  return (
    <div className="my-select-wrapper p-xs">
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
        {(options.enumOptions || []).map(({ value, label }: any, i: number) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>

      {rawErrors.length > 0 && (
        <div className="text-red-600 text-sm mt-2">{rawErrors.join(", ")}</div>
      )}
    </div>
  );
};

export function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  const { canAdd, items, onAddClick } = props;

  return (
    <div className="">
      {items.map((element, index) => (
        <div key={index} className="mt-sm">
          
          <div className="flex justify-end gap-1 mb-xs px-sm">
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
          <div className="border-l-8 border-base-content border-opacity-70 -mt-lg">
            {element.children}
          </div>
        </div>
      ))}

      {canAdd && (
        <div className="px-sm pb-xs">
        <button
          aria-label="Add item"
          type="button"
          className="btn btn-primary btn-sm w-full no-animation"
          onClick={onAddClick}
        >
          Add Item
        </button></div>
      )}
    </div>
  );
}

export function ArrayFieldItemTemplate(props: ArrayFieldTemplateItemType) {
  const { children, className } = props;
  return <div className={className}>#####{children}####</div>;
}

export function DescriptionFieldTemplate(props: DescriptionFieldProps) {
  const { description, id } = props;
  
  // Sprawdzenie, czy opis jest z najwyższego poziomu schematu
  const isRootLevel = id.split("_");


  return (
    description && (
      <div
        id={id}
        className={`text-xs p-sm pt-0  ${
          isRootLevel[1] ? "bg-base-200" : "border border-neutral p-xl m-xs bg-neutral-content"
        }`}
      >
        {description}
      </div>
    )
  );
}

export function FieldTemplate(props: FieldTemplateProps) {
  const { id, help, required, description, errors, children, schema } = props;
  const isRootLevel = id.split("_").length === 2;

  return (
    <div className={`border-base-300 ${isRootLevel && "border-b"}`}>
      {schema.label && schema.type && (
        <label
          htmlFor={id}
          className={`block form-label text-sm font-normal text-opacity-70 ${
            isRootLevel ? "bg-base-200 p-sm" : "px-sm pt-sm"
          }`}
        >
          {schema.label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      {schema.description && schema.type && (
        <div className={`px-xs`}>{description}</div>
      )}
      <>{children}</>
      {errors && <div className="form-errors text-danger">{errors}</div>}
      {help && <div className="form-help text-muted">{help}</div>}
    </div>
  );
}

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
