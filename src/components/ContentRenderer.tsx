import React from "react";
import { BlocksRenderer } from "./Blocks/BlocksRenderer";
import { Block } from "./Blocks/Types";

// Main Component to render content
export const ContentRenderer: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block, index) => (
        <div key={index}>
          <BlocksRenderer block={block} />
        </div>
      ))}
    </div>
  );
};
