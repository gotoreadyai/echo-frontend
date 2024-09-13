import { FiPower } from "react-icons/fi";
import { actionsListSchemaPart } from "../data/schemaParts";

export const ActionBlockSchema = {
  id: "query",
  filename: "ActionBlock",
  jsonSchema: {
    title: "Initial actions block",
    properties: {
      scope: { type: "string", label: "Scope" },
      actions: actionsListSchemaPart,

    },
  },
  icon: FiPower,
  group: "data",
  data: {},
};

export default ActionBlockSchema;
