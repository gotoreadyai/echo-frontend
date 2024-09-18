// src/components/SlotsEditableRenderer.tsx
import { FC } from "react";
import BlockRenderer from "./BlockRenderer";
import { useBlockStore } from "../stores/blockStore";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiCopy } from "react-icons/fi"; // Import FiCopy icon
import { Block } from "../types/types";

interface SlotsRendererProps {
  slots: Record<string, Block[]>;
  slotName: string;
}

const SlotsEditableRenderer: FC<SlotsRendererProps> = ({ slots, slotName }) => {
  const {
    selectedSlot,
    selectedBlock,
    setSelectedSlot,
    setSelectedBlock,
    isEditing,
    setCopiedBlocks, // Include setCopiedBlocks from the store
  } = useBlockStore();

  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle slot selection
  const handleSlotClick = () => {
    if (isEditing && selectedSlot !== slotName) {
      setSelectedSlot(slotName);
      setSelectedBlock(null);

      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("rightbar");
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    }
  };

  // Function to handle individual block selection
  const handleBlockClick = (block: Block) => {
    setSelectedBlock(block);
    setSelectedSlot(slotName);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("rightbar", "block");
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  };

  // Function to handle copying all blocks in the slot
  const handleCopySlotBlocks = () => {
    if (isEditing) {
      const blocksToCopy = slots[slotName] || [];
      setCopiedBlocks(blocksToCopy); // Replace copiedBlocks with blocksToCopy
      console.log(`Copied ${blocksToCopy.length} blocks from slot "${slotName}"`);
      // Optional: Provide user feedback here (e.g., toast notification)
    }
  };

  return (
    <>
      {/* Border around the slot */}
      <div
        className={`absolute w-full h-full border z-10 pointer-events-none ${
          selectedSlot === slotName ? "border-primary" : "border-base-300"
        }`}
      ></div>

      {/* Slot Header */}
      <div
        className={`absolute -top-8 h-8 z-20 rounded-t flex justify-between items-center px-md gap-xs ${
          selectedSlot === slotName ? "bg-primary" : "bg-base-300"
        }`}
      >
        {/* Slot Name and Check Icon */}
        <div
          className="flex gap-xs items-center h-full text-sm cursor-pointer"
          onClick={handleSlotClick}
        >
          <FiCheckCircle
            className={`${
              selectedSlot === slotName ? "text-neutral" : "text-warning"
            }`}
          />
          <span
            className={`${selectedSlot === slotName ? "text-neutral" : ""}`}
          >
            {slotName}
          </span>
        </div>

        {/* Copy Button */}
        {isEditing && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering handleSlotClick
              handleCopySlotBlocks();
            }}
            className="p-1 rounded hover:bg-gray-200 focus:outline-none z-30"
            title="Copy all blocks in this slot"
          >
            <FiCopy className="text-sm" />
          </button>
        )}
      </div>

      {/* Spacer */}
      <div className="h-px"></div>

      {/* Render All Blocks in the Slot */}
      {slots[slotName] &&
        slots[slotName].map((block: Block) => (
          <div key={block.id} className="block-wrapper m-px relative">
            <BlockRenderer block={block} />
            <div
              className={`absolute top-px bottom-px left-px right-px w-full h-full border ${
                selectedBlock?.id === block.id
                  ? "bg-primary bg-opacity-10 border-secondary"
                  : "border-base-300 border-dashed"
              }`}
              onPointerDown={(e) => {
                e.stopPropagation();
                handleBlockClick(block);
              }}
            ></div>
          </div>
        ))}
    </>
  );
};

export default SlotsEditableRenderer;
