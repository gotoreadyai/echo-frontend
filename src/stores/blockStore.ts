// src/stores/blockStore.ts
import create from "zustand";
import { Block } from "../types/types";

interface BlockStore {
  slots: Record<string, Block[]>;
  isEditing: boolean;
  selectedSlot: string | null;
  selectedBlock: Block | null;
  copiedBlock: Block | null; // Dodane
  setSlots: (slots: Record<string, Block[]>) => void;
  addBlockToSlot: (slotName: string, block: Block) => void;
  setSelectedSlot: (slotName: string) => void;
  setSelectedBlock: (block: Block | null) => void;
  setCopiedBlock: (block: Block | null) => void; // Dodane
  removeBlock: (blockId: string, slotName: string) => void;
  deselectBlock: () => void;
  moveBlock: (
    blockId: string,
    slotName: string,
    direction: "up" | "down"
  ) => void;
  setBlockData: (blockId: string, data: Record<string, unknown>) => void;
}

export const useBlockStore = create<BlockStore>((set) => ({
  slots: {},
  isEditing: true,
  selectedSlot: null,
  selectedBlock: null,
  copiedBlock: null, // Dodane

  setSlots: (slots) => set({ slots }),

  addBlockToSlot: (slotName, block) => {
    set((state) => ({
      slots: {
        ...state.slots,
        [slotName]: [...(state.slots[slotName] || []), block],
      },
    }));
  },

  setSelectedSlot: (slotName) => set({ selectedSlot: slotName }),

  setSelectedBlock: (block) => set({ selectedBlock: block }),

  setCopiedBlock: (block) => set({ copiedBlock: block }), // Dodane

  removeBlock: (blockId, slotName) => {
    set((state) => ({
      slots: {
        ...state.slots,
        [slotName]: state.slots[slotName].filter(
          (block) => block.id !== blockId
        ),
      },
    }));
  },

  deselectBlock: () => set({ selectedBlock: null }),

  moveBlock: (blockId, slotName, direction) => {
    set((state) => {
      const slotBlocks = [...(state.slots[slotName] || [])];
      const blockIndex = slotBlocks.findIndex((block) => block.id === blockId);

      if (blockIndex === -1) return state;

      const newIndex = direction === "up" ? blockIndex - 1 : blockIndex + 1;

      if (newIndex < 0 || newIndex >= slotBlocks.length) return state;

      const [movedBlock] = slotBlocks.splice(blockIndex, 1);
      slotBlocks.splice(newIndex, 0, movedBlock);

      return {
        slots: {
          ...state.slots,
          [slotName]: slotBlocks,
        },
      };
    });
  },

  setBlockData: (blockId, data) => {
    set((state) => {
      const updatedSlots = { ...state.slots };

      Object.keys(updatedSlots).forEach((slotName) => {
        const blocks = updatedSlots[slotName];
        if (Array.isArray(blocks)) {
          updatedSlots[slotName] = blocks.map((block) =>
            block.id === blockId ? { ...block, data } : block
          );
        } else {
          // Obsłuż przypadek, gdy blocks nie jest tablicą
          console.warn(`Slot "${slotName}" nie jest tablicą.`, blocks);
        }
      });

      return { slots: updatedSlots };
    });
  },
}));
