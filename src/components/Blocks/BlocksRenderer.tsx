import React from "react";
import { Block } from "./Types";
import { FIELD_CONFIG } from "./FIELD_CONFIG";


export const BlocksRenderer: React.FC<{ block: Block }> = ({ block }) => {
  const renderBlock = (block: Block) => {
    const blockType = FIELD_CONFIG[block.type];
    if (!blockType) {
      return null;
    }

    const Component = blockType.component;
    return <Component {...block.data} />;
  };

  return renderBlock(block);
};
