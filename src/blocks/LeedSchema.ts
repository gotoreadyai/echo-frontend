import { LuBlinds } from "react-icons/lu";
import { backgroundSchemaPart } from "../data/schemaParts";
export const LeedSchema = {
  filename: "Leed",
  jsonSchema: {
    title: "Leed Block",
    type: "object",
    properties: {
      title: {
        type: "string",
        label: "Header text",
      },
      text: {
        type: "string",
        label: "Paragraph text",
      },
      className: {
        type: "string",
        label: "CSS Class",
      },
      background: backgroundSchemaPart,
    },
    required: ["title", "text"],
  },

  icon: LuBlinds,
  group: "content",
  data: {
    title: "Default Header",
    text: "Default paragraph text",
    className: "header-class",
    background: "", // Default value
  },
};

export default LeedSchema;
