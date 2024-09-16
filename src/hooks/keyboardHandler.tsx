// src/components/KeyboardHandler.tsx
import React, { useEffect, useRef } from "react";
import { useBlockStore } from "../stores/blockStore";
import { Block } from "../types/types";

const KeyboardHandler: React.FC = () => {
  const {
    isEditing,
    selectedSlot,
    selectedBlock,
    setCopiedBlock,
    addBlockToSlot, 
    removeBlock,
    deselectBlock,
    moveBlock,
  } = useBlockStore();

  const copiedBlockRef = useRef<Block | null>(null);
  const selectedSlotRef = useRef<string | null>(null);
  const selectedBlockRef = useRef<Block | null>(null);
  const isEditingRef = useRef<boolean>(isEditing);

  useEffect(() => {
    selectedBlockRef.current = selectedBlock;
  }, [selectedBlock]);

  useEffect(() => {
    selectedSlotRef.current = selectedSlot;
  }, [selectedSlot]);

  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEditingRef.current) {
        return;
      }

      if (e.ctrlKey && e.key === "c" && selectedBlockRef.current) {
        setCopiedBlock(selectedBlockRef.current);
        copiedBlockRef.current = selectedBlockRef.current;
      } else if (
        e.ctrlKey &&
        e.key === "v" &&
        copiedBlockRef.current &&
        selectedSlotRef.current
      ) {
        const newBlock: Block = {
          ...copiedBlockRef.current,
          id: Date.now().toString(),
        };
        addBlockToSlot(selectedSlotRef.current, newBlock);
      } else if (
        e.key === "Delete" &&
        selectedBlockRef.current &&
        selectedSlotRef.current
      ) {
        e.preventDefault();
        removeBlock(selectedBlockRef.current.id, selectedSlotRef.current);
        deselectBlock();
      }
      // Obsługa ArrowUp
      else if (
        e.key === "ArrowUp" &&
        selectedBlockRef.current &&
        selectedSlotRef.current
      ) {
        e.preventDefault();
        moveBlock(selectedBlockRef.current.id, selectedSlotRef.current, "up");
      }
      // Obsługa ArrowDown
      else if (
        e.key === "ArrowDown" &&
        selectedBlockRef.current &&
        selectedSlotRef.current
      ) {
        e.preventDefault();
        moveBlock(selectedBlockRef.current.id, selectedSlotRef.current, "down");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addBlockToSlot, setCopiedBlock, removeBlock, deselectBlock, moveBlock]);

  return null;
};

export default KeyboardHandler;
