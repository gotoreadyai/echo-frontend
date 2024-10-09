/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
const actionFiles: Record<string, () => Promise<any>> = import.meta.glob(
  "../actions/*.tsx"
);

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

  const cachedComponent = actionCache.get(action);
  if (cachedComponent) {
    setComponent(() => cachedComponent);
    return;
  }

  const path = `../actions/${action}.tsx`;
  const loadFile = actionFiles[path];
  if (!loadFile) {
    const errorMessage = `Action file: ${path} not found`;
    console.error(errorMessage);
    setError(errorMessage);
    setComponent(null);
    return;
  }

  try {
    const actionMod = await loadFile();
    const Component = (
      actionMod.default ? actionMod.default : (await actionMod()).default
    ) as React.FC<{
      scope: string;
      onActionResult: (success: boolean) => void;
    }>;
    if (Component) {
      actionCache.set(action, Component);
      setComponent(() => Component);
    } else {
      throw new Error(`Component not found for action: ${action}`);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    setError(`Error loading action: ${errorMessage}`);
    setComponent(null);
  }
};

export const genErrorMessage = (error: any, scope: string): string => {
  return ` ${error?.msg ? error.msg : "error"} for scope: ${scope}. ${
    error?.error ? error.error : ""
  }`;
};