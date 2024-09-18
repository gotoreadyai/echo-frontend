import { FiSend } from "react-icons/fi";
import { actionsListSchemaPart } from "../data/schemaParts";

export const SubmitFormSchema = {
  id: "6744c21b-5194-4a58-833a-341d8b0ab31f",
  filename: "SubmitForm",
  jsonSchema: {
    title: "Submit Form",
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
      className: { type: "string", label: "CSS Class" },
    },
    required: ["actions"],
    
  },
  icon: FiSend,
  group: "data",
  data: { className: "submit-button-class" },
};

export default SubmitFormSchema;
