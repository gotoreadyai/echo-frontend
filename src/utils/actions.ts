/* eslint-disable @typescript-eslint/no-explicit-any */
interface actionMod {
  default: React.FC<{ scope: string }>;
}

export const loadActionComponent = async (
  action: string,
  setComponent: any
) => {
  const files = import.meta.glob("../actions/*.tsx");
  try {
    const path = `../actions/${action}.tsx`;
    console.log("Loading action:", path);
    if (files[path]) {
      const actionMod = await files[path]();
      if (actionMod && (actionMod as actionMod).default) {
        setComponent(() => (actionMod as actionMod).default);
      } else {
        console.error(`Component not found in module for action: ${action}`);
      }
    } else {
      console.error(`Mutation file: ${path} not found`);
    }
  } catch (error) {
    console.error("Error loading mutation component:", error);
  }
};

export const notifyColor = (type: string) => {
  switch (type) {
    case "success":
      return "bg-success";
    case "error":
      return "bg-error";
    case "info":
      return "bg-info";
    default:
      return "gb-base-300";
  }
};

export const notifyText = (type: string) => {
  switch (type) {
    case "success":
      return "text-success";
    case "error":
      return "text-error";
    case "info":
      return "text-info";
    default:
      return "text-neutral";
  }
};
