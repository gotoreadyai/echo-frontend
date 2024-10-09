/* eslint-disable @typescript-eslint/no-explicit-any */
// selectBlockUtils.ts
import { Dispatch, SetStateAction } from "react";


// Define the types for the parameters your callbacks will need
interface InitializeSelectParams {
  isInitialized: boolean;
  combinedOptions: any;
  fieldName?: string;
  filterName?: string;
  filterValue: string;
  fieldValue: string;
  updateField: (field: string, value: string) => void;
  setFilters: (filters: Record<string, string>) => void;
  setUSParam: (key: string, value: string) => void;
  setIsInitialized: Dispatch<SetStateAction<boolean>>;
}

export const initializeSelect = ({
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
}: InitializeSelectParams) => {
  if (isInitialized && combinedOptions.length === 0) return;

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

  if (combinedOptions.length > 0) {
    setIsInitialized(true);
  }
};

interface UpdateStoresParams {
  value: string;
  fieldName?: string;
  filterName?: string;
  fieldValue: string;
  filterValue: string;
  updateField: (field: string, value: string) => void;
  setFilters: (filters: Record<string, string>) => void;
  setUSParam: (key: string, value: string) => void;
}

export const updateStores = ({
  value,
  fieldName,
  filterName,
  fieldValue,
  filterValue,
  updateField,
  setFilters,
  setUSParam,
}: UpdateStoresParams) => {
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
};

interface HandleUpdateStoresParams {
    value: string;
    fieldName?: string;
    filterName?: string;
    fieldValue: string;
    filterValue: string;
    updateField: (field: string, value: string) => void;
    setFilters: (filters: Record<string, string>) => void;
    setUSParam: (key: string, value: string) => void;
  }
  
  export const handleUpdateStores = ({
    value,
    fieldName,
    filterName,
    fieldValue,
    filterValue,
    updateField,
    setFilters,
    setUSParam,
  }: HandleUpdateStoresParams) => {
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
  };
  