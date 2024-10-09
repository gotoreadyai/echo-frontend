import { LuTextSelect } from "react-icons/lu";

export const TextAreaBlockSchema = {
  id: "8d6a0d21-e548-4f0c-bb8a-4ae456479b68",
  filename: "TextAreaBlock",
  jsonSchema: {
    title: "Textarea",
    properties: {
      label: { type: "string", label: "Input Label" },
      fieldName: {
        type: "string",
        label: "Field name",
        description: "Input Field Name as target path",
      },
      rows: { type: "number", label: "Rows" },
      autocomplete: { type: "string", label: "Autocomplete" },
      forcedDefaultValue: { type: "string", label: "Forced default" },
      className: { type: "string", label: "CSS Class" },
      readonly: { type: "boolean", label: "Readonly" },
    },
  },
  icon: LuTextSelect,
  group: "data",
  data: {
    label: "Input Label",
    fieldName: "inputField",
    className: "input-class",
  },
};

export default TextAreaBlockSchema;
