import { LuTextCursorInput } from "react-icons/lu";

export const InputBlockSchema = {
  id: "8d6a0d21-e548-4f0c-bb8a-4ae456479b68",
  filename: "InputBlock",
  jsonSchema: {
    title: "Input Block",
    properties: {
      label: { type: "string", label: "Input Label" },
      fieldName: {
        type: "string",
        label: "Field name",
        description: "Input Field Name as target path",
      },
      type: {
        type: "string",
        label: "Variant",
        enum: ["text", "number", "password", "email"],
      },
      autocomplete: { type: "string", label: "Autocomplete" },
      forcedDefaultValue: { type: "string", label: "Forced default" },
      className: { type: "string", label: "CSS Class" },
      readonly: { type: "boolean", label: "Readonly" },
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
