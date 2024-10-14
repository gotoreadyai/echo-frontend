/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseInputTemplateProps, getInputProps } from "@rjsf/utils";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { FiCrosshair, FiDatabase, FiFilter } from "react-icons/fi";
import { useGlobalStore } from "../../stores";

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

  const isRootLevel = id.split("_");
  return (
    <div
      className={`p-xs bg-base-100 flex gap-xs items-stretch ${
        isRootLevel.length === 2 ? "bg-base-200" : ""
      }`}
    >
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
      {id === "root_scope" && (
        <div>
          <button
            className="btn btn-xs btn-primary h-full px-md"
            onClick={() => {
              useGlobalStore.setState(() => ({
                scopeManager: {
                  ...useGlobalStore.getState().scopeManager,
                  selectedRJSF_Id: "scope",
                },
              }));
             
            }}
          >
            <FiDatabase />
          </button>
        </div>
      )}
      {id === "root_fieldName" && (
        <div>
          <button
            className="btn btn-xs btn-primary h-full px-md"
            onClick={() => {
              console.log("filter");
            }}
          >
            <FiCrosshair />
          </button>
        </div>
      )}
      {id === "root_filterName" && (
        <div>
          <button
            className="btn btn-xs btn-primary h-full px-md"
            onClick={() => {
              console.log("filter");
            }}
          >
            <FiFilter />
          </button>
        </div>
      )}
    </div>
  );
};
