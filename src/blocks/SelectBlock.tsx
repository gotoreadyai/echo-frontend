/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { usePageStore, getGetterByPath } from "../stores/pageStore";
import useNav from "../hooks/useNav";
import { editConditions } from "../utils/layoutRendererConditions";
import { PathParams } from "../types/types";
import { useParams } from "react-router-dom";
import { SelectBlockProps } from "../types/selectBlockT";

const SelectBlock: React.FC<SelectBlockProps> = ({
  label,
  scope,
  fieldName,
  filterName,
  options = [],
  className = "",
  returnKey = "id",
  scopeKey = "title", // Domyślne użycie "title" jako klucza, chyba że podano inny klucz
  sendName,
}) => {
  const { getUSParam, navigateTo } = useNav();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { action } = useParams<PathParams>();

  // Pobieranie dynamicznych opcji z pageStore, jeśli podano scope
  const dynamicOptions: any[] =
    usePageStore((state) => {
      if (scope) {
        return getGetterByPath(scope)(state.pageData);
      }
      return [];
    }) || [];

  // Użycie dynamicznych opcji, jeśli są dostępne, w przeciwnym razie użycie przekazanych options
  const availableOptions: any[] =
    dynamicOptions.length > 0 ? dynamicOptions : options;
  const updateField = usePageStore((state) => state.updateField);

  // Funkcja ustawiająca wartość dla pola
  const handleSetValue = (name: string) => {
    const currentValue = getUSParam(name); // Pobieranie wartości z URL
    if (currentValue) {
      setSelectedValue(currentValue);
      updateField(fieldName, currentValue);
    } else if (availableOptions.length > 0) {
      // Jeśli nie ma wartości w URL, ustaw pierwszą dostępną opcję
      const firstOption = availableOptions[0].id;
      setSelectedValue(firstOption);
      updateField(fieldName, firstOption);

      // Dodaj domyślną wartość do URL, jeśli jest ustawiony filterName
      filterName &&
        navigateTo(window.location.pathname, {
          queryParams: { [name]: firstOption },
        });
    } else {
      setSelectedValue("");
    }
  };

  // Obsługa zmiany opcji w select
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateField(fieldName, value);
    setSelectedValue(value);

    const paramName = filterName || fieldName.replace(/\./g, "");
    filterName &&
      navigateTo(window.location.pathname, {
        queryParams: { [paramName]: value },
      });

    /* jeśli chcemy dodadkowo do scope wysłąć nazwę pola */
    const sendAsName = availableOptions.filter(
      (word) => word[returnKey] === e.target.value
    )[0][scopeKey];
    sendName && updateField(sendName, sendAsName);
  };

  useEffect(() => {
    if (!editConditions(action)) {
      handleSetValue(filterName || fieldName.replace(/\./g, ""));
    }
  }, [filterName, fieldName, availableOptions, updateField]);

  return (
    <div className={`${className} container mx-auto`}>
      {label && (
        <label
          htmlFor={filterName ? filterName : fieldName.replace(/\./g, "")}
          className="block text-sm font-medium text-gray-700 pb-xs"
        >
          {label}
        </label>
      )}
      <select
        id={filterName ? filterName : fieldName.replace(/\./g, "")}
        name={filterName ? filterName : fieldName.replace(/\./g, "")}
        className="select select-bordered w-full text-base-content transition-opacity duration-300 ease-in-out"
        onChange={handleChange}
        value={selectedValue} // Ustawienie wybranej wartości
      >
        <option value="" disabled>
          Select an option
        </option>
        {availableOptions.map((option) => (
          <option key={option.id} value={option[returnKey]}>
            {option[scopeKey] || option.title} {/* Obsługa scopeKey */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBlock;
