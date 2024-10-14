import { FiLink } from "react-icons/fi";

export const LinkSchema = {
  id: "bc0d1b89-f8b0-48b9-8978-1f7ed1c5e5c9",
  filename: "Link",
  jsonSchema: {
    title: "Link",
    properties: {
      name: { type: "string", label: "Link Text" },
      to: { type: "string", label: "Link URL" },
      className: { type: "string", label: "CSS Class" },
      size: {
        type: "string",
        label: "Size",
        enum: ["", "btn-xs", "btn-sm", "btn-md", "btn-lg", "btn-xl"],
      },
      variant: {
        type: "string",
        label: "Variant",
        enum: [
          "",
          "btn-neutral",
          "btn-primary",
          "btn-secondary",
          "btn-accent",
          "btn-ghost",
          "btn-link",
          "btn-hairline"
        ],
      },
      outline: { type: "boolean", label: "Is outline" },
      wide: { type: "boolean", label: "Is wide" },
    },
  },
  icon: FiLink,
  group: "content",
  data: { name: "Link", to: "/", className: "link-class" },
};

export default LinkSchema;
