// SelectBlock.tsx
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { getGetterByPath, usePageStore } from "../stores/pageStore";
import { useGlobalStore } from "../stores/globalStore";
import { useNavigation } from "../hooks";
import { handleUpdateStores, initializeSelect } from "../hooks/dynamicSelect";
import { useParams } from "react-router-dom";
import { PathParams } from "../types/types";

interface Option {
  id: string;
  name?: string;
  title?: string;
}

interface SelectBlockProps {
  className?: string;
  label: string;
  scope?: string;
  fieldName?: string;
  filterName?: string;
  options: Option[];
}

export const SelectBlock: React.FC<SelectBlockProps> = ({
  label,
  fieldName,
  filterName,
  className = "container mx-auto",
  options = [],
  scope = "",
}) => {
  const { setUSParam } = useNavigation();
  const { action } = useParams<PathParams>();
  const setFilters = useGlobalStore((state) => state.setFilters);
  const filters = useGlobalStore((state) => state.filters);
  const listData: Option[] = usePageStore(
    (state) => (scope ? getGetterByPath(scope)(state.pageData) : []) || []
  );
  const combinedOptions: Option[] = useMemo(() => {
    return [...listData, ...options];
  }, [listData, options]);
  const { fieldValue, updateField } = usePageStore((state) => ({
    fieldValue: fieldName ? state.getFieldValue(fieldName) || "" : "",
    updateField: state.updateField,
  }));
  const filterValue: string = filterName
    ? getGetterByPath(filterName.replace("filters.", ""))(filters) || ""
    : "";
  const [isInitialized, setIsInitialized] = useState(false);
  const isHandleChangeRef = useRef(false);

  // Inicjalizujemy select za pomocą przeniesionej funkcji initializeSelect
  const initialize = useCallback(() => {
    initializeSelect({
      isInitialized,
      combinedOptions,
      fieldName,
      filterName,
      filterValue,
      fieldValue,
      updateField,
      setFilters,
      setUSParam,
      setIsInitialized,
    });
  }, [
    isInitialized,
    combinedOptions,
    fieldName,
    filterName,
    filterValue,
    fieldValue,
    updateField,
    setFilters,
    setUSParam,
  ]);

  // Używamy handleUpdateStores za pomocą przeniesionej funkcji handleUpdateStores
  const handleUpdate = useCallback(
    (value: string) => {
      handleUpdateStores({
        value,
        fieldName,
        filterName,
        fieldValue,
        filterValue,
        updateField,
        setFilters,
        setUSParam,
      });
    },
    [
      fieldName,
      filterName,
      fieldValue,
      filterValue,
      updateField,
      setFilters,
      setUSParam,
    ]
  );

  // Wywołujemy initializeSelect, gdy komponent zostanie zamontowany lub zmienią się zależności
  useEffect(() => {
    if (!action) {
      initialize();
    } 
  }, [initialize, action]);

  /**
   * handleChange - Obsługuje zmianę w select dropdown
   * @param e - Zdarzenie zmiany
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    isHandleChangeRef.current = true;
    handleUpdate(value);
  };

  /**
   * selectValue - Określa wartość do wybrania w dropdown na podstawie propsów i stanu
   */
  const selectValue = useMemo(() => {
    if (fieldName && filterName) {
      return typeof filterValue === "string" ? filterValue : fieldValue;
    }
    if (fieldName) {
      return typeof fieldValue === "string" ? fieldValue : "";
    }
    if (filterName) {
      return typeof filterValue === "string" ? filterValue : "";
    }
    return "";
  }, [fieldName, filterName, filterValue, fieldValue]);

  /**
   * Effect to update the URL whenever a new list is loaded for selection
   * (Uncommented and adjusted to avoid conflicts)
   */
  useEffect(() => {
    if (isHandleChangeRef.current) {
      isHandleChangeRef.current = false;
      return;
    }

    const currentOptionExists = combinedOptions.some(
      (option) => option.id === selectValue
    );

    if (!currentOptionExists && combinedOptions.length > 0) {
      const firstOptionId = combinedOptions[0].id;
      handleUpdate(firstOptionId);
    }
  }, [combinedOptions, selectValue, fieldName, filterName, handleUpdate]);

  return (
    <div className={`${className} select-none`}>
      {/* Label dla elementu select */}
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Element select */}
      <select
        className="select select-bordered w-full mb-2"
        value={selectValue}
        onChange={handleChange}
        disabled={combinedOptions.length === 0}
      >
        {/* Renderowanie każdej opcji */}
        {combinedOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name || option.title}
          </option>
        ))}
      </select>

      {/* Wyświetlanie komunikatu, jeśli brak dostępnych opcji */}
      {combinedOptions.length === 0 && (
        <p className="text-sm text-gray-500">No options available</p>
      )}
    </div>
  );
};

export default SelectBlock;
