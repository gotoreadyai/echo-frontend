import { FiLink } from "react-icons/fi";

export const LinkSchema = {
  id: "bc0d1b89-f8b0-48b9-8978-1f7ed1c5e5c9",
  filename: "Link",
  jsonSchema: {
    title: "Link Block",
    properties: {
      name: { type: "string", label: "Link Text" },
      to: { type: "string", label: "Link URL" },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: FiLink,
  group: "content",
  data: { name: "Link", to: "/", className: "link-class" },
};

export default LinkSchema;
