import { LuStretchHorizontal } from "react-icons/lu";

export const ListBlockSchema = {
  id: "b8a6f7a8-7f84-4cbe-b8e6-245a72b9cfa6",
  filename: "ListBlock",
  jsonSchema: {
    title: "List Block",
    properties: {
      path: { type: "string", label: "Path to Data" },
      repeater: {
        type: "array",
        label: "Repeater Fields",
        items: {
          type: "object",
          properties: {
            label: { type: "string", label: "Label for Data Field" },
            key: { type: "string", label: "Key for Data Field" },
          },
        },
      },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: LuStretchHorizontal,
  group: "collection",
  data: {
    path: "data.items",
    repeater: [
      { label: "Name", key: "name" },
      { label: "Description", key: "description" },
    ],
    className: "list-component-class",
  },
};

export default ListBlockSchema;
