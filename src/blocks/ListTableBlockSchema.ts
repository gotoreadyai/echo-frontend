import { FiTable } from "react-icons/fi";

export const ListTableBlockSchema = {
  id: "b8a6f7a8-7f84-4cbe-b8e6-245a72b9cfa6",
  filename: "ListTableBlock",
  jsonSchema: {
    title: "ListTable",
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
      url: { type: "string", label: "Row url" },
      actions: {
        type: "array",
        label: "Actions",
        items: {
          type: "object",
          properties: {
            icon: {
              type: "string",
              label: "Icon name",
              enum: ["","trash", "edit","file"],
            },
            url: { type: "string", label: "Action url" },
          },
        },
      },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: FiTable,
  group: "collection",
  data: {
    path: "data.items",
    repeater: [
      { label: "Name", key: "name" },
      { label: "Description", key: "description" },
    ],
    className: "list-component-class",
  },
  preview:`
  <div class='flex p-sm items-stretch gap-px'>
    <div class="flex-1 gap-px flex flex-col">
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
    </div>
    <div class="flex-1 gap-px flex flex-col">
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
    </div>
    <div class="flex-1 gap-px flex flex-col">
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
    </div>
  </div>
  `
};

export default ListTableBlockSchema;
