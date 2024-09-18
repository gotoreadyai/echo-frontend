import React from "react";
import { usePageStore } from "../stores/pageStore";

interface InputBlockProps {
  label: string;
  fieldName: string; // Klucz do identyfikacji pola w globalnym stanie
  type?: string;
  readonly?: boolean
}

export const InputBlock: React.FC<InputBlockProps> = ({
  label,
  fieldName,
  type,
  readonly =false
}) => {
  const updateField = usePageStore((state) => state.updateField);
  const fieldValue =
    usePageStore((state) => state.getFieldValue(fieldName)) || ""; // Pobieranie wartości

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(fieldName, e.target.value); // Aktualizacja dynamicznej ścieżki
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type={type || "text"}
        className="input input-bordered w-full mb-2"
        value={fieldValue}
        readOnly={readonly}
        disabled={readonly}
        onChange={handleChange} // Wywołanie funkcji zmiany wartości
      />
    </div>
  );
};

export default InputBlock;
