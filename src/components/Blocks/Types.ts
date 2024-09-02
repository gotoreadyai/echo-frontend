// Define the BlockType and Block types
export type BlockType =
  | "text"
  | "image"
  | "heading"
  | "quote"
  | "list"
  | "crud"
  | "formTextInput"
  | "formTextarea"
  | "formSelectInput"
  | "formRelationInput"
  | "formJSONInput"; 

export type Block = {
  id: string; // Unique identifier
  type: BlockType;
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
};
