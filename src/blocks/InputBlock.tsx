import React, { useEffect } from "react";
import { usePageStore } from "../stores/pageStore";

interface InputBlockProps {
  label: string;
  fieldName: string; // Klucz do identyfikacji pola w globalnym stanie
  type?: string;
  readonly?: boolean;
  forcedDefaultValue?: string; // Dodana nowa właściwość
  className?: string;
}

export const InputBlock: React.FC<InputBlockProps> = ({
  label,
  fieldName,
  type,
  readonly = false,
  forcedDefaultValue,
  className
}) => {
  // Pobieramy zarówno wartość pola, jak i funkcję aktualizującą w jednym wywołaniu
  const { fieldValue, updateField } = usePageStore((state) => ({
    fieldValue: state.getFieldValue(fieldName) || "",
    updateField: state.updateField,
  }));

  // Używamy useEffect, aby ustawić forcedDefaultValue, jeśli wartość nie jest ustawiona
  useEffect(() => {
    if (!usePageStore.getState().getFieldValue(fieldName) && forcedDefaultValue) {
      updateField(fieldName, forcedDefaultValue);
    }else{
      updateField(fieldName, fieldValue ? fieldValue : '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName, forcedDefaultValue, updateField]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(fieldName, e.target.value); // Aktualizacja dynamicznej ścieżki
  };

  return (
    <div className={  `${className} container mx-auto ` }>
      <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={fieldName}
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
