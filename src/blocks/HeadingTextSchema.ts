// HeadingTextSchema.ts
import { LuHeading } from "react-icons/lu";
import { textVariantsSchemaPart } from "../data/schemaParts";

export const HeadingTextSchema = {
  id: "279e0f10-79ce-427a-91a2-81b2e54fb38a",
  filename: "HeadingText",
  jsonSchema: {
    title: "Heading text block",
    description:
      "Schemat definiujący blok nagłówka tekstowego, który wyświetla tytuł z opcjonalnymi klasami CSS.",
    properties: {
      text: {
        type: "string",
        label: "Header Text",
        description: "Tekst, który będzie wyświetlany jako nagłówek.",
      },
      variant: textVariantsSchemaPart,
      className: {
        type: "string",
        label: "CSS Class",
        description:
          "Opcjonalna klasa CSS do zastosowania dla elementu nagłówka w celu dostosowania stylów. [py-md text-4xl pb-md text-center font-bold]",
      },
    },
    required: ["text"], // Zakładam, że 'text' jest wymagany
  },
  icon: LuHeading, // Przechowuje komponent, nie string
  group: "content",
  data: { text: "Default Header", className: "" },
};

export default HeadingTextSchema;
