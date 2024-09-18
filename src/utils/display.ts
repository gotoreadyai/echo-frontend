import { LuTrash2 } from "react-icons/lu";
import { LuPenLine } from "react-icons/lu";
import { LuInfo } from "react-icons/lu";
import { LuFile } from "react-icons/lu";


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


export const icons = (type: string) => {
  switch (type) {
    case "trash":
      return LuTrash2;
    case "edit":
      return LuPenLine;
    case "file":
      return LuFile;
    default:
      return LuInfo;
  }
};
