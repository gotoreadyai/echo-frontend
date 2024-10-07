/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect } from "react";
import { getGetterByPath, usePageStore } from "../stores/pageStore";

interface Option {
  id: string;
  name: string;
}

interface SelectBlockProps {
  className?: string;
  label: string;
  scope?: string;
  fieldName: string;
  options: Option[];
}

export const SelectBlock: React.FC<SelectBlockProps> = ({
  label,
  fieldName,
  className,
  options = [],
  scope = "",
}) => {
  const updateField = usePageStore((state) => state.updateField);

  const listData: any[] =
    usePageStore(
      useCallback((state) => getGetterByPath(scope)(state.pageData), [scope])
    ) || [];

  const fieldValue =
    usePageStore((state) => state.getFieldValue(fieldName)) || "";

  useEffect(() => {
    if (scope && listData.length > 0 && !fieldValue) {
     
      console.log('updateField', fieldName, listData[0]?.id);
      
      updateField(fieldName, listData[0]?.id);
    }
  }, [scope, listData, fieldValue, updateField, fieldName]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateField(fieldName, e.target.value);
  };

  return (
    <div className={`${className} container mx-auto `}>
      <label className="block text-sm font-medium text-gray-700 pb-xs">
        {label}
      </label>
      <select
        className="select select-bordered w-full mb-2"
        value={fieldValue}
        onChange={handleChange}
      >
        {[...listData, ...options].map((option) => (
          <option key={option?.id} value={option?.id}>
            {option?.name || option?.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBlock;