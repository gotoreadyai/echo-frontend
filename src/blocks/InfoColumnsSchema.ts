import { HiOutlineViewBoards } from "react-icons/hi";

export const InfoColumnsSchema = {
  id: "xad8f7d6-2302-4772-ac5f-8a792b000c8d",
  filename: "InfoColumns",
  jsonSchema: {
    title: "Info Columns",
    properties: {
      text: { type: "string", label: "Header Text" },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: HiOutlineViewBoards, // Store the component, not the string
  group: "collection",
  data: { text: "Default Header", className: "header-class" },
  preview: `<div class='flex justify-between p-sm items-stretch gap-xs'>
    <div class="flex flex-1 gap-px">
      <div class="w-3 h-3 bg-neutral"></div>
      <div class="flex-1 flex flex-col gap-xs">
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
      </div>
    </div>
    <div class="flex flex-1 gap-px">
      <div class="w-3 h-3 bg-neutral"></div>
      <div class="flex-1 flex flex-col gap-xs">
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
        <div class="h-1.5 bg-neutral"></div>
      </div>
    </div>
  </div>`,
};

export default InfoColumnsSchema;
