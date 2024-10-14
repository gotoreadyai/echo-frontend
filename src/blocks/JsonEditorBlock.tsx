import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { usePageStore } from "../stores/pageStore";

interface JSONBlockProps {
  label: string;
  fieldName: string; // Klucz do identyfikacji pola w globalnym stanie
  isRequired?: boolean;
  isReadOnly?: boolean;
  forcedDefaultValue?: object;
  className?: string;
  height?: number;
}

export const JsonEditorBlock: React.FC<JSONBlockProps> = ({
  label,
  fieldName = "",
  isRequired = false,
  isReadOnly = false,
  forcedDefaultValue,
  className,
  height = 300,
}) => {
  const { fieldValue, updateField } = usePageStore((state) => ({
    fieldValue: state.getFieldValue(fieldName) || {},
    updateField: state.updateField,
  }));

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentFieldValue = usePageStore.getState().getFieldValue(fieldName);
    if (!currentFieldValue && forcedDefaultValue) {
      updateField(fieldName, forcedDefaultValue);
    }
  }, [fieldName, forcedDefaultValue, updateField]);

  const jsonString = JSON.stringify(fieldValue, null, 2);

  const handleEditorChange = (newValue: string | undefined) => {
    if (!isReadOnly && newValue !== undefined) {
      try {
        const parsedValue = JSON.parse(newValue);
        setError(null);
        updateField(fieldName, parsedValue);
      } catch (error) {
        setError("Niepoprawna składnia JSON");
      }
    }
  };

  return (
    <div className={`${className} container mx-auto select-none px-md pb-md`}>
      <label className="block text-sm font-medium text-gray-700 pb-xs">
        {label} {isRequired && <span>*</span>}
      </label>
      <Editor
        height={`${height}px`}
        language="json"
        value={jsonString}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          readOnly: isReadOnly,
          minimap: { enabled: false },
          lineNumbers: "on",
        }}
      />
      {error && <p className="alert alert-error rounded-none mt-2">{error}</p>}
    </div>
  );
};

export default JsonEditorBlock;