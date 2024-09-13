import { LuFormInput } from "react-icons/lu";

export const SelectBlockSchema = {
  id: "unique-select-block-id",
  filename: "SelectBlock",
  jsonSchema: {
    title: "Select Block",
    properties: {
      label: { type: "string", label: "Select Label" },
      fieldName: { type: "string", label: "Field Name" },
      options: {
        type: "array",
        label: "Options",
        items: {
          type: "object",
          properties: {
            label: { type: "string", label: "Option Label" },
            value: { type: "string", label: "Option Value" },
          },
        },
      },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: LuFormInput,
  group: "data",
  data: {
    label: "Select an Option",
    fieldName: "selectField",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    className: "select-class",
  },
};

export default SelectBlockSchema;
