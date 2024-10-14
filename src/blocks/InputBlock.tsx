import React, { useEffect } from "react";
import { usePageStore } from "../stores/pageStore";

interface InputBlockProps {
  label: string;
  fieldName: string;
  type?: string;
  autocomplete?: string;
  readonly?: boolean;
  forcedDefaultValue?: string;
  className?: string;
}

export const InputBlock: React.FC<InputBlockProps> = ({
  label,
  fieldName = "",
  autocomplete,
  type,
  readonly = false,
  forcedDefaultValue,
  className,
}) => {
  const { fieldValue, updateField } = usePageStore((state) => ({
    fieldValue: state.getFieldValue(fieldName) || "",
    updateField: state.updateField,
  }));

  useEffect(() => {
    const currentFieldValue = usePageStore.getState().getFieldValue(fieldName);
    if (!currentFieldValue && forcedDefaultValue) {
      updateField(fieldName, forcedDefaultValue);
    }
  }, [fieldName, forcedDefaultValue, updateField]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(fieldName, e.target.value);
  };

  return (
    <div className={`${className} container mx-auto select-none`}>
      <label
        htmlFor={fieldName.replace(/\./g, "")}
        className="block text-sm font-medium text-gray-700 pb-xs"
      >
        {label}
      </label>
      <input
        id={fieldName.replace(/\./g, "")}
        type={type || "text"}
        autoComplete={autocomplete || undefined}
        name={fieldName.replace(/\./g, "")}
        className="input input-bordered w-full"
        value={fieldValue}
        readOnly={readonly}
        disabled={readonly}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputBlock;
