// src/components/SlotsRenderer.tsx
import React, { FC } from "react";
import BlockRenderer from "./BlockRenderer";
import { Block } from "../types/types";

interface SlotsRendererProps {
  slots: Record<string, Block[]>;
  slotName: string;
}

const SlotsRenderer: FC<SlotsRendererProps> = ({ slots, slotName }) => {
  if (!slots[slotName]) {
    return <div>No content for {slotName}</div>;
  }

  return (
    <>
      {slots[slotName].map((block: Block) => (
        <div key={block.id} className="block-wrapper">
          <BlockRenderer block={block} />
        </div>
      ))}
    </>
  );
};

export default SlotsRenderer;
