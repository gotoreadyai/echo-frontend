// src/components/SlotsRenderer.tsx
import { FC } from "react";
import BlockRenderer from "./BlockRenderer";
import { Block } from "../types/types";

interface SlotsRendererProps {
  slots: Record<string, Block[]>;
  slotName: string;
}

const SlotsRenderer: FC<SlotsRendererProps> = ({ slots, slotName }) => {
  if (!slots[slotName]) {
    console.log(`No content for ${slotName}`);
    return <></>;
  }

  return (
    <>
      {slots[slotName].map((block: Block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
};

export default SlotsRenderer;
