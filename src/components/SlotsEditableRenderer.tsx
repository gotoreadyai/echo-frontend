// src/components/SlotsEditableRenderer.tsx
import React, { FC } from "react";
import BlockRenderer from "./BlockRenderer";
import { useBlockStore } from "../stores/blockStore";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
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
  } = useBlockStore();

  const location = useLocation();
  const navigate = useNavigate();

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

  const handleBlockClick = (block: Block) => {
    setSelectedBlock(block);
    setSelectedSlot(slotName);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("rightbar", "block");
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  };

  return (
    <>
      <div
        className={`absolute w-full h-full border z-10 pointer-events-none ${
          selectedSlot === slotName ? "border-primary" : "border-base-300 "
        }`}
      ></div>
      <div
        onClick={handleSlotClick}
        className={`absolute -top-8 h-8 z-10 rounded-t ${
          selectedSlot === slotName ? "bg-primary" : "bg-base-300 "
        }`}
      >
        <div className="flex px-md gap-xs items-center h-full text-sm cursor-pointer">
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
        <div
          className="absolute w-full h-full top-0 "
          onClick={handleSlotClick}
        ></div>
      </div>
      <div className="h-px"></div>
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
