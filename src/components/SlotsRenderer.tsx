/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import BlockRenderer from "./BlockRenderer";

interface SlotsRendererProps {
  slots: Record<string, any>;
  slotName: string;
}

const SlotsRenderer: FC<SlotsRendererProps> = ({ slots, slotName }) => {
  if (!slots[slotName]) {
    return <div>No content for {slotName}</div>;
  }

  return (
    <>
      {slots[slotName].map((block: any) => (
        <div key={block.id} className="block-wrapper">
          <BlockRenderer block={block} />
        </div>
      ))}
    </>
  );
};

export default SlotsRenderer;
