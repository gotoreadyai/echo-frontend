// Define the BlockType and Block types
export type BlockType = "text" | "image" | "heading" | "quote" | "list";

export type Block = {
  id: string; // Unique identifier
  type: BlockType;
  data: any; // Structure of 'data' depends on block type
};