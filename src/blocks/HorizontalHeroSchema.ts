import { LuLayoutList } from "react-icons/lu";
import { backgroundSchemaPart } from "../data/schemaParts";

export const HorizontalHeroSchema = {
  id: "xad8f7d6-2302-4772-ac5f-8a792b000c8d",
  filename: "HorizontalHero",
  jsonSchema: {
    title: "Horizontal Hero",
    properties: {
      prefix:{ type: "string", label: "Prefix text" },
      title: { type: "string", label: "Header Text" },
      text: { type: "string", label: "Content Text" },
      className: { type: "string", label: "CSS Class" },
      background: backgroundSchemaPart,
    },
  },
  icon: LuLayoutList, // Store the component, n  ot the string
  group: "content",
  data: { text: "Default Header", className: "header-class" },
};

export default HorizontalHeroSchema;  