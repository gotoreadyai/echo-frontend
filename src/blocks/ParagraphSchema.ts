import { LuText } from "react-icons/lu";

export const ParagraphSchema = {
  id: "3b6883c2-4cd2-40f0-8bb9-63223362bf9e",
  filename: "Paragraph",
  jsonSchema: {
    title: "Paragraph Block",
    properties: {
      text: { type: "string", label: "Paragraph Text" },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: LuText,
  group: "content",
  data: { text: "Default paragraph text.", className: "paragraph-class" },
};

export default ParagraphSchema;
