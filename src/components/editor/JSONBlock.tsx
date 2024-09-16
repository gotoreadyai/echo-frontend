import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface JSONBlockProps {
  id: string;
  label: string;
  value: object;
  isRequired: boolean;
  isReadOnly?: boolean;
  onChange: (value: object) => void;
}

const JSONBlock: React.FC<JSONBlockProps> = ({
  label,
  value,
  isRequired,
  isReadOnly = false,
  onChange,
}) => {
  const [error, setError] = useState<string | null>(null);

  const jsonString = JSON.stringify(value, null, 2);

  const handleEditorChange = (newValue: string | undefined) => {
    if (!isReadOnly && newValue !== undefined) {
      try {
        const parsedValue = JSON.parse(newValue);
        setError(null);
        onChange(parsedValue);
      } catch (error) {
        setError("Niepoprawna składnia JSON");
      }
    }
  };

  return (
    <div className="json-editor">
      <label className="block p-md">
        {label} {isRequired && <span>*</span>}
      </label>
      <Editor
        height="calc(100vh - 280px)"
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
      {error && <p className="alert alert-error rounded-none">{error}</p>}
    </div>
  );
};

export default JSONBlock;
