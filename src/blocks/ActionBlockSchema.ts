// ActionBlockSchema.ts
import { FiPower } from "react-icons/fi";
import { actionsListSchemaPart } from "../data/schemaParts";

export const ActionBlockSchema = {
  id: "query",
  filename: "ActionBlock",
  jsonSchema: {
    title: "Initial actions block",
    description:
      "Schemat definiujący blok akcji, które będą wykonywane sekwencyjnie.",
    properties: {
      actions: {
        label: "Akcje (lista)",
        ...actionsListSchemaPart,
        description:
          "Lista akcji do wykonania. Każda akcja zawiera zakres (scope) oraz identyfikator akcji (action).",
      },
      reloadOnParamsChange: {
        type: "boolean",
        default: false,
        description:
          "Określa, czy blok akcji ma się przeładować, gdy zmienią się parametry URL.",
      },
    },
    required: ["actions"],
  },
  icon: FiPower,
  group: "data",
  data: {},
};

export default ActionBlockSchema;
