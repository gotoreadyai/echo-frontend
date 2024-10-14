import { FiMoreHorizontal } from "react-icons/fi";

export const PaginationBlockSchema = {
  id: "e5e066dc-d0f8-44d2-a87f-b84a505fe42b",
  filename: "PaginationBlock",
  jsonSchema: {
    title: "Pagination",
    properties: {
      filterName: { type: "string", label: "filterName" },
      scope: { type: "string", label: "Scope" },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: FiMoreHorizontal,
  group: "data",
  data: {
    className: "logo-class",
    filterName: "filters.documents.page",
    scope: "documents.items",
  },
};

export default PaginationBlockSchema;
