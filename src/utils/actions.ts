/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ModelSingular } from "../../models_EXPORT/models";

// Initialize the import.meta.glob once to avoid re-execution on each function call
const actionFiles: Record<string, () => Promise<any>> = import.meta.glob(
  "../actions/*.tsx"
);

// Use a Map for caching components for better performance and flexibility
const actionCache = new Map<
  string,
  React.FC<{ scope: string; onActionResult: (success: boolean) => void }>
>();

export const loadActionComponent = async (
  action: string,
  setComponent: React.Dispatch<
    React.SetStateAction<React.FC<{
      scope: string;
      onActionResult: (success: boolean) => void;
    }> | null>
  >,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
  if (!action) {
    setError("Action parameter is undefined");
    setComponent(null);
    return;
  }

  // Check if the component is already cached
  const cachedComponent = actionCache.get(action);
  if (cachedComponent) {
    console.log(`Using cached action component for: ${action}`);
    setComponent(() => cachedComponent);
    return;
  }

  const path = `../actions/${action}.tsx`;
  console.log("Loading action:", path);

  const loadFile = actionFiles[path];
  if (!loadFile) {
    const errorMessage = `Action file: ${path} not found`;
    console.error(errorMessage);
    setError(errorMessage);
    setComponent(null);
    return;
  }

  try {
    // Load the module dynamically
    const actionMod = await loadFile();

    // Handle the possibility of a nested promise for default export
    const Component = (
      actionMod.default ? actionMod.default : (await actionMod()).default
    ) as React.FC<{
      scope: string;
      onActionResult: (success: boolean) => void;
    }>;

    if (Component) {
      // Cache the loaded component
      actionCache.set(action, Component);
      setComponent(() => Component);
    } else {
      throw new Error(`Component not found for action: ${action}`);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error loading Action component:", errorMessage);
    setError(`Error loading action: ${errorMessage}`);
    setComponent(null);
  }
};

export const getModelKey = (input: string): string | undefined => {
  if (input in ModelSingular) {
    return input;
  }
  return findModelByValue(input);
};

export const findModelByValue = (value: string): string | undefined => {
  return Object.keys(ModelSingular).find((key) => ModelSingular[key] === value);
};




export const sanitizeByModel = <
  T extends Record<string, any>,
  K extends keyof T
>(
  inputData: T,
  scope: Record<K, any>
): Pick<T, K> => {
  const allowedKeys = Object.keys(scope) as K[];
  const sanitizedData = {} as Pick<T, K>;

  allowedKeys.forEach((key) => {
    if (key in inputData) {
      sanitizedData[key] = inputData[key];
    }
  });

  return sanitizedData;
};

