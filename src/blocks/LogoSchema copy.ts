import { LuHome } from "react-icons/lu";

export const PaginationBlockSchema = {
  id: "9c8fd44a-b4d2-4b6d-a9ab-d8ac6d52d44c",
  filename: "PaginationBlock",
  jsonSchema: {
    title: "Pagination",
    properties: {
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: LuHome,
  group: "content",
  preview: `<div class="flex border border-neutral gap-xs p-sm">
    <div class="w-2 h-2 bg-neutral"></div>
    <div class="w-2 h-2 bg-neutral"></div>
    <div class="w-2 h-2 bg-neutral"></div>
    <div class="w-2 h-2 flex items-center">...</div>
    
  </div>`,
  data: { className: "" },
};

export default PaginationBlockSchema;
