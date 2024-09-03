import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { FIELD_CONFIG } from '../Blocks/FIELD_CONFIG';
import { BlockType } from '../Blocks/Types';

interface BlockButtonGridProps {
  activeTab: 'content' | 'form';
  addBlock: (type: BlockType) => void;
  handleSaveContent: () => void;
}

const BlockButtonGrid: React.FC<BlockButtonGridProps> = ({ activeTab, addBlock, handleSaveContent }) => {
  return (
    <div className="grid grid-cols-2 gap-md p-md">
      {Object.keys(FIELD_CONFIG)
        .filter((blockType) => FIELD_CONFIG[blockType].componentType === activeTab)
        .map((blockType) => (
          <button
            key={blockType}
            onClick={() => addBlock(blockType as BlockType)}
            className="btn btn-outline font-thin text-xs no-animation"
          >
            <FiPlus /> {blockType.charAt(0).toUpperCase() + blockType.slice(1)}
          </button>
        ))}
      <button
        onClick={handleSaveContent}
        className="btn btn-success col-span-2 no-animation"
      >
        Save Content
      </button>
    </div>
  );
};

export default BlockButtonGrid;
