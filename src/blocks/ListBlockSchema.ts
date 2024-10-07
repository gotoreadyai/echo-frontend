import { LuStretchHorizontal } from "react-icons/lu";

export const ListBlockSchema = {
  id: "b8a6f7a8-7f84-4cbe-b8e6-245a72b9cfa6",
  filename: "ListBlock",
  jsonSchema: {
    title: "List Block",
    properties: {
      path: { type: "string", label: "Scope" },
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
  preview: `<div class='flex flex-col justify-between p-sm items-stretch gap-xs'>
    
        <div class="p-0.5 border border-neutral flex gap-xs">
         <div class="h-2 bg-neutral w-1/4"></div>
         <div class="h-2 bg-neutral w-1/4"></div>
         <div class="h-2 bg-neutral flex-1"></div>
        </div>
        <div class="p-0.5 border border-neutral flex gap-xs">
         <div class="h-2 bg-neutral w-1/4"></div>
         <div class="h-2 bg-neutral w-1/4"></div>
         <div class="h-2 bg-neutral flex-1"></div>
        </div>
         <div class="p-0.5 border border-neutral flex gap-xs">
         <div class="h-2 bg-neutral w-1/4"></div>
         <div class="h-2 bg-neutral w-1/4"></div>
         <div class="h-2 bg-neutral flex-1"></div>
        </div>
        
        
    
  </div>`,
};

export default ListBlockSchema;
