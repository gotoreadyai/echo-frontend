import React, { useEffect, useState } from "react";
import { useBlockStore } from "../../stores/blockStore";
import { v4 as uuidv4 } from "uuid";
import { Block, BlockDefinition } from "../../types/types";
import LayoutSelector from "./LayoutSelector";

import { FiGrid } from "react-icons/fi";
import SelectedSlotSaver from "./SelectedSlotSaver";
import { getUSParam } from "../../utils/navigation";

const blockSchemas = import.meta.glob("../../blocks/*.ts");

const BlockSidebar: React.FC = () => {
  const { selectedSlot, addBlockToSlot, setSelectedBlock, slots } =
    useBlockStore((state) => ({
      selectedSlot: state.selectedSlot,
      addBlockToSlot: state.addBlockToSlot,
      setSelectedBlock: state.setSelectedBlock,
      slots: state.slots,
    }));

  const [selectedGroup, setSelectedGroup] = useState<string>("content");
  const [groupedBlocks, setGroupedBlocks] = useState<
    Record<string, BlockDefinition[]>
  >({});

  const rightbar = getUSParam("rightbar");

  useEffect(() => {
    const loadBlockSchemas = async () => {
      const groups: Record<string, BlockDefinition[]> = {};
      for (const path in blockSchemas) {
        const module = (await blockSchemas[path]()) as {
          default: BlockDefinition;
        };
        const block = module.default;
        block.icon = block.icon || {}; // Ensure a default icon value
        const groupName = block.group || "others";
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(block);
      }
      setGroupedBlocks(groups);
    };
    loadBlockSchemas();
  }, []);

  const handleAddBlock = (blockKey: string) => {
    if (!selectedSlot) {
      alert("Please select a slot first.");
      return;
    }

    const blockSchema = groupedBlocks[selectedGroup]?.find(
      (block) => block.filename === blockKey
    );
    if (!blockSchema) {
      console.error("Block schema not found for key:", blockKey);
      return;
    }

    const newBlock: Block = {
      id: uuidv4(),
      filename: blockKey,
      data: blockSchema.data || {}, // Use default data if available
      icon: blockSchema.icon || undefined,
    };

    addBlockToSlot(selectedSlot, newBlock);
    setSelectedBlock(newBlock);
    console.log("BlockStore layout after adding block:", slots);
  };

  const renderGroupTabs = () =>
    Object.keys(groupedBlocks).map((group) => (
      <button
        key={group}
        className={`tab ${
          selectedGroup === group ? "tab-active bg-base-100" : ""
        } ${rightbar ? "px-px" : ""}`}
        onClick={() => setSelectedGroup(group)}
      >
        {/* /* */}

        {!rightbar
          ? group.charAt(0).toUpperCase() + group.slice(1)
          : group.charAt(0)}
      </button>
    ));

  const renderBlockButtons = () =>
    groupedBlocks[selectedGroup]?.map((block, i) => (
      <button
        key={i}
        className="btn btn-md btn-outline w-full no-animation font-light px-3"
        onClick={() => handleAddBlock(block.filename)}
      >
        <div className="text-lg">
          {block.icon &&
            typeof block.icon === "function" &&
            React.createElement(block.icon)}
        </div>
        {!rightbar && (
          <div className="text-sm text-left flex-1">
            {block.jsonSchema.title}
          </div>
        )}
      </button>
    ));

  return (
    <div
      className={`${ 
        rightbar ? "w-20" : "w-80"
      } bg-base-200 h-full flex flex-col`}
      
    >
      <div
        className={`flex items-center gap-sm ${
          rightbar ? "justify-center" : ""
        } px-md py-sm border-b border-base-300`}
      >
        <FiGrid strokeWidth={0.5} className="w-8 h-8" />
        {!rightbar && <h1 className="text-xl font-black m-0.5">BlockBox</h1>}
      </div>
      {!rightbar && <LayoutSelector label="Choose layout:" />}
      {!rightbar && (
        <div className="border-b border-base-300">
          <label className="block p-md">Choose block:</label>
        </div>
      )}
      <div className="tabs tabs-bordered bg-base-300">{renderGroupTabs()}</div>
      <div className="border-b border-base-300">
        <div
          className={`grid ${rightbar ? "p-md" : "p-sm py-md"} ${
            rightbar ? "grid-cols-1" : "grid-cols-2"
          } gap-sm`}
        >
          {renderBlockButtons()}
        </div>
      </div>
      <div className="flex-1"></div>
      <SelectedSlotSaver />
    </div>
  );
};

export default BlockSidebar;
