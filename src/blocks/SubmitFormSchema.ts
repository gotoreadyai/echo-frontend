import { FiSend } from "react-icons/fi";

export const SubmitFormSchema = {
  id: "6744c21b-5194-4a58-833a-341d8b0ab31f",
  filename: "SubmitForm",
  jsonSchema: {
    title: "Submit Form",
    properties: {
      className: { type: "string", label: "CSS Class" },
      endpoint: { type: "string", label: "API Endpoint" },
      method: {
        type: "string",
        enum: ["GET", "POST", "PUT", "DELETE"],
        label: "HTTP Method",
      },
    },
  },
  icon: FiSend,
  group: "data",
  data: { className: "submit-button-class" },
};

export default SubmitFormSchema;
