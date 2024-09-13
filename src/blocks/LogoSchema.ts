import { LuHome } from "react-icons/lu";

export const LogoSchema = {
  id: "9c8fd44a-b4d2-4b6d-a9ab-d8ac6d52d44c",
  filename: "Logo",
  jsonSchema: {
    title: "Logo Block",
    properties: {
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: LuHome,
  group: "content",
  data: { className: "logo-class" },
};

export default LogoSchema;
