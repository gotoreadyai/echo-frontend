import { LuTextCursorInput } from "react-icons/lu";

export const InputBlockSchema = {
  id: "8d6a0d21-e548-4f0c-bb8a-4ae456479b68",
  filename: "InputBlock",
  jsonSchema: {
    title: "Input Block",
    properties: {
      label: { type: "string", label: "Input Label" },
      fieldName: { type: "string", label: "Field Name" },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: LuTextCursorInput,
  group: "data",
  data: {
    label: "Input Label",
    fieldName: "inputField",
    className: "input-class",
  },
};

export default InputBlockSchema;
