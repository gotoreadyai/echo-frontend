import React from "react";
import { Block } from "../Blocks/Types";

export const BlockEditorControls: React.FC<{
  block: Block;
  index: number;
  selectedBlockId: string | null;
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>;
  moveBlockUp: (index: number) => void;
  moveBlockDown: (index: number) => void;
  removeBlock: (id: string) => void;
}> = ({
  block,
  index,

  moveBlockUp,
  moveBlockDown,
  removeBlock,
}) => {
  return (
    <div className="flex justify-end mb-2">
      <button
        onClick={() => moveBlockUp(index)}
        className="btn btn-secondary mr-2 btn-sm text-xs"
      >
        Up
      </button>
      <button
        onClick={() => moveBlockDown(index)}
        className="btn btn-secondary mr-2 btn-sm text-xs"
      >
        Down
      </button>
      <button
        onClick={() => removeBlock(block.id)}
        className="btn btn-error mr-2 btn-sm text-xs"
      >
        Remove
      </button>
      <label htmlFor={`modal-${block.id}`} className="btn btn-primary btn-sm text-xs">
        Edit
      </label>
    </div>
  );
};
