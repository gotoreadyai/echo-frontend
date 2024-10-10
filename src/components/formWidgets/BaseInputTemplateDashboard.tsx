/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseInputTemplateProps, getInputProps } from "@rjsf/utils";
import { ChangeEvent, InputHTMLAttributes } from "react";

export const BaseInputTemplateDashboard = (props: BaseInputTemplateProps) => {
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
      className={`p-xs  ${
        isRootLevel.length === 2 ? "bg-base-100" : ""
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
    </div>
  );
};
