import { HiOutlineViewBoards } from "react-icons/hi"

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
};

export default InfoColumnsSchema;  