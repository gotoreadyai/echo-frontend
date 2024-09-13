import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const JSONBlock: React.FC<{
  id: string;
  label: string;
  value: object; // Zakładamy, że value jest obiektem JSON
  isRequired: boolean;
  onChange: (value: object) => void;
}> = ({ label, value, isRequired, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  // Konwersja obiektu JSON na string
  const jsonString = JSON.stringify(value, null, 2);

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      try {
        // Konwersja stringa z powrotem na obiekt JSON
        const parsedValue = JSON.parse(newValue);
        setError(null); // Jeśli JSON jest poprawny, wyczyść błąd
        onChange(parsedValue);
      } catch (error) {
        setError("Invalid JSON syntax"); // Ustawienie błędu w przypadku niepoprawnego JSON-a
      }
    }
  };

  return (
    <div className="json-editor">
      <label className="block p-md">
        {label} {isRequired && <span>*</span>}
      </label>
      <Editor
        height="calc(100vh - 280px)" // "100vh"
        language="json"
        value={jsonString}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          lineNumbers: "on",
        }}
      />
      {error && <p className="alert alert-error rounded-none">{error}</p>}
    </div>
  );
};

export default JSONBlock;
