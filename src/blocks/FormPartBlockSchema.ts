import { LuListTodo } from "react-icons/lu";

export const FormPartBlockSchema = {
  id: "9c8fd44a-b4d2-4b6d-a9ab-d8ac6d52d44c",
  filename: "FormPartBlock",
  jsonSchema: {
    title: "Form part",
    properties: {
      schemaScope: { type: "string", label: "Schema scope" },
      dataScope: { type: "string", label: "Data scope" },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: LuListTodo,
  group: "data",
  data: { className: "logo-class" },
};

export default FormPartBlockSchema;
