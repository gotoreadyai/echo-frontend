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
  const setFilters = useGlobalStore((state) => state.setFilters);
  const filters = useGlobalStore((state) => state.filters);
  const { setUSParam } = useNavigation();

  const listData: Option[] = usePageStore(
    (state) => (scope ? getGetterByPath(scope)(state.pageData) : []) || []
  );

  // Memoize combinedOptions to avoid unnecessary recalculations
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

  const [initialized, setInitialized] = useState(false);

  /**
   * Ref to track if the change was initiated by handleChange
   */
  const isHandleChangeRef = useRef(false);

  /**
   * Initializes the select field by setting the initial value based on the current state
   */
  const initializeSelect = useCallback(() => {
    if (initialized) return;
    if (fieldName && filterName) {
      if (filterValue) {
        if (fieldValue !== filterValue) {
          updateField(fieldName, filterValue);
        }
      } else if (combinedOptions.length > 0) {
        const firstOptionId = combinedOptions[0].id;
        updateField(fieldName, firstOptionId);
        setFilters({ [filterName]: firstOptionId });
        setUSParam(filterName, firstOptionId);
      }
    } else if (fieldName) {
      if (!fieldValue && combinedOptions.length > 0) {
        const firstOptionId = combinedOptions[0].id;
        updateField(fieldName, firstOptionId);
      }
    } else if (filterName) {
      if (!filterValue && combinedOptions.length > 0) {
        const firstOptionId = combinedOptions[0].id;
        setFilters({ [filterName]: firstOptionId });
        setUSParam(filterName, firstOptionId);
      }
    }

    setInitialized(true);
  }, [
    initialized,
    fieldName,
    filterName,
    filterValue,
    fieldValue,
    combinedOptions,
    updateField,
    setFilters,
    setUSParam,
  ]);

  /**
   * Updates the relevant stores and URL parameters based on the selected value
   * @param value - The selected option's value
   */
  const updateStores = useCallback(
    (value: string) => {
      if (fieldName && filterName) {
        if (fieldValue !== value) {
          updateField(fieldName, value);
        }
        if (filterValue !== value) {
          setFilters({ [filterName]: value });
          setUSParam(filterName, value);
        }
      } else if (fieldName) {
        if (fieldValue !== value) {
          updateField(fieldName, value);
        }
      } else if (filterName) {
        if (filterValue !== value) {
          setFilters({ [filterName]: value });
          setUSParam(filterName, value);
        }
      }
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

  useEffect(() => {
    initializeSelect();
  }, [initializeSelect]);

  /**
   * Handle change event from the select dropdown
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    // Indicate that the change is initiated by handleChange
    isHandleChangeRef.current = true;
    updateStores(value);
  };

  /**
   * Determines the value to be selected in the dropdown
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
   * Effect to update the URL whenever loaded new list to select
   */
  useEffect(() => {
    if (isHandleChangeRef.current) {
      isHandleChangeRef.current = false;
      return;
    }
    if (selectValue && filterName && listData.length > 0) {
      const firstOptionId = combinedOptions[0].id;
      setFilters({ [filterName]: firstOptionId });
      setUSParam(filterName, firstOptionId);
    }
  }, [listData, initialized]);

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        className="select select-bordered w-full mb-2"
        value={selectValue}
        onChange={handleChange}
        disabled={combinedOptions.length === 0}
      >
        {combinedOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name || option.title}
          </option>
        ))}
      </select>
      {combinedOptions.length === 0 && (
        <p className="text-sm text-gray-500">No options available</p>
      )}
    </div>
  );
};

export default SelectBlock;
