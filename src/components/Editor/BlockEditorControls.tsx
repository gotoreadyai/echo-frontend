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
    <div className="flex justify-end mb-2  p-1 absolute w-full -ml-2 -mt-10">
      <button
        onClick={() => moveBlockUp(index)}
        className="btn btn-secondary mr-2 btn-xs text-xs"
      >
        Up
      </button>
      <button
        onClick={() => moveBlockDown(index)}
        className="btn btn-secondary mr-2 btn-xs text-xs"
      >
        Down
      </button>
      <button
        onClick={() => removeBlock(block.id)}
        className="btn btn-error mr-2 btn-xs text-xs"
      >
        Remove
      </button>
      <label htmlFor={`modal-${block.id}`} className="btn btn-primary btn-xs text-xs">
        Edit
      </label>
    </div>
  );
};
