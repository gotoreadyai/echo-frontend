import { LuHeading } from "react-icons/lu";

export const HeadingTextSchema = {
  id: "279e0f10-79ce-427a-91a2-81b2e54fb38a",
  filename: "HeadingText",
  jsonSchema: {
    title: "Heading text block",
    properties: {
      text: { type: "string", label: "Header Text" },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: LuHeading, // Store the component, not the string
  group: "content",
  data: { text: "Default Header", className: "" },
};

export default HeadingTextSchema;
