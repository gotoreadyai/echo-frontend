import React from "react";
import { usePageStore } from "../stores/pageStore";

interface Option {
  label: string;
  value: string;
}

interface SelectBlockProps {
  label: string;
  fieldName: string; // Klucz do identyfikacji pola w globalnym stanie
  options: Option[]; // Tablica opcji z etykietą i wartością
}

export const SelectBlock: React.FC<SelectBlockProps> = ({ label, fieldName, options = [] }) => {
  const updateField = usePageStore((state) => state.updateField);
  const fieldValue = usePageStore((state) => state.getFieldValue(fieldName)) || ""; // Pobieranie wartości

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateField(fieldName, e.target.value); // Aktualizacja dynamicznej ścieżki
  };

  return (
    <div>
      <label className="block pb-sm ">{label}</label>
      <select
        className="select select-bordered w-full mb-2"
        value={fieldValue}
        onChange={handleChange} // Wywołanie funkcji zmiany wartości
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBlock;
