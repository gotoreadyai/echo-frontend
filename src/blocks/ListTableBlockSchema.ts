import { FiTable } from "react-icons/fi";

export const ListTableBlockSchema = {
  id: "ec3dfd6d-7629-417f-91f5-79a830312900",
  filename: "ListTableBlock",
  jsonSchema: {
    title: "List table",
    properties: {
      path: {
        type: "string",
        label: "Scope",
        description:
          "Bezpośrednia ścieżka do (scope) dla zasobu załadowanego do strony",
      },

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
      url: {
        type: "string",
        label: "Row url",
        description: "Przekierowanie po kliknięciu w wiersz",
      },
      actions: {
        type: "array",
        label: "Actions",
        description: "Akcje w postaci ikon umieszczone na końcu wiersza",
        items: {
          type: "object",
          properties: {
            icon: {
              type: "string",
              label: "Icon name",
              enum: ["", "trash", "edit", "file"],
            },
            url: { type: "string", label: "Action url" },
            label: { type: "string", label: "Action label" },
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
  preview: `<div class="flex gap-px items-stretch p-sm"><div class="flex gap-px flex-1 flex-col"><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div></div><div class="flex gap-px flex-1 flex-col"><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div></div><div class="flex gap-px flex-1 flex-col"><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div><div class="bg-neutral h-1.5"></div></div></div>`,
};

export default ListTableBlockSchema;
