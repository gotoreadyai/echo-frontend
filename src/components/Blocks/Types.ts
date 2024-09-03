import { LAYOUTS } from "../Layouts/LAYOUTS";

// Define the BlockType and Block types
export type BlockType =
  | "text"
  | "image"
  | "heading"
  | "quote"
  | "list"
  | "link"
  | "crud"
  | "formButton"
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

export type Content = Record<string, Block[]>;

export type WorkspaceContent = {
  layout: keyof typeof LAYOUTS;
  withPages?: boolean;
};

export type WorkspaceData = {
  workspace: {
    content: WorkspaceContent;
  };
};

export type ModelData = {
  document: {
    content: Content;
  };
};
