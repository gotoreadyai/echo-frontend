import { FiAlignLeft } from "react-icons/fi";

export const WorkspacesHeroSchema = {
  id: "xad8f7ds-2302-4772-ac5f-8a792b000c8d",
  filename: "WorkspacesHero",
  jsonSchema: {
    title: "Hero",
    properties: {
      text: { type: "string", label: "Header Text" },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: FiAlignLeft, // Store the component, not the string
  group: "content",
  data: { text: "Default Header", className: "header-class" },
};

export default WorkspacesHeroSchema;  