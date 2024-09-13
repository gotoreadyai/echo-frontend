/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand';
import { Block } from '../types/types';

interface BlockStore {
  slots: Record<string, Block[]>;
  isEditing: boolean;
  selectedSlot: string | null;
  selectedBlock: Block | null;
  setSlots: (slots: Record<string, Block[]>) => void;
  addBlockToSlot: (slotName: string, block: Block) => void;
  setSelectedSlot: (slotName: string) => void;
  setSelectedBlock: (block: Block | null  ) => void;
  removeBlock: (blockId: string, slotName: string) => void;
  deselectBlock: () => void;
  moveBlock: (blockId: string, slotName: string, direction: 'up' | 'down') => void;
  setBlockData: (blockId: string, data: Record<string, any>) => void;
}

export const useBlockStore = create<BlockStore>((set) => ({
  slots: {},
  isEditing: true,
  selectedSlot: null,
  selectedBlock: null,

  setSlots: (slots) => set({ slots }),

  addBlockToSlot: (slotName, block) => set((state) => ({
    slots: {
      ...state.slots,
      [slotName]: [...(state.slots[slotName] || []), block],
    },
  })),

  setSelectedSlot: (slotName) => set({ selectedSlot: slotName }),

  setSelectedBlock: (block) => set({ selectedBlock: block }),

  removeBlock: (blockId, slotName) => set((state) => ({
    slots: {
      ...state.slots,
      [slotName]: state.slots[slotName].filter((block) => block.id !== blockId),
    },
  })),

  deselectBlock: () => set({ selectedBlock: null }),

  moveBlock: (blockId, slotName, direction) => set((state) => {
    const slotBlocks = [...(state.slots[slotName] || [])];
    const blockIndex = slotBlocks.findIndex((block) => block.id === blockId);

    if (blockIndex === -1) return state;

    const newIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;

    if (newIndex < 0 || newIndex >= slotBlocks.length) return state;

    // Zamiana bloków
    const [movedBlock] = slotBlocks.splice(blockIndex, 1);
    slotBlocks.splice(newIndex, 0, movedBlock);

    return {
      slots: {
        ...state.slots,
        [slotName]: slotBlocks,
      },
    };
  }),

  setBlockData: (blockId, data) => set((state) => {
    const updatedSlots = { ...state.slots };

    Object.keys(updatedSlots).forEach((slotName) => {
      updatedSlots[slotName] = updatedSlots[slotName].map((block) =>
        block.id === blockId ? { ...block, data } : block
      );
    });

    return { slots: updatedSlots };
  }),
}));
