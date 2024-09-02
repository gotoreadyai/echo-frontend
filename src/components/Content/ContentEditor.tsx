import { useState, useEffect } from "react";
import { BlocksRenderer } from "../Blocks/BlocksRenderer";
import { Block, BlockType } from "../Blocks/Types";
import { RenderFormFields } from "../CrudManager/RenderFormFields";
import { FieldConfig } from "../CrudManager/Types";
import { useCrudMutations } from "../CrudManager/useCrudMutations";
import { BlockEditorControls } from "../Editor/BlockEditorControls";
import DaisyDrawer from "../DaisyDrawer";

export const ContentEditor: React.FC<{
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}> = ({ blocks: initialBlocks, setBlocks }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Block | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fieldConfigs: Record<string, Record<string, FieldConfig>> = {
    text: {
      content: { type: "TEXT", label: "Content", allowNull: false },
    },
    image: {
      src: { type: "TEXT", label: "Image URL", allowNull: false },
      alt: { type: "TEXT", label: "Alt Text", allowNull: true },
    },
    heading: {
      content: { type: "TEXT", label: "Heading Content", allowNull: false },
      level: { type: "TEXT", label: "Heading Level", allowNull: false },
    },
    quote: {
      content: { type: "TEXT", label: "Quote Content", allowNull: false },
      author: { type: "TEXT", label: "Author", allowNull: true },
    },
    list: {
      items: { type: "TEXT", label: "List Items", allowNull: false },
      ordered: { type: "TEXT", label: "Ordered List", allowNull: true },
    },
    // Add more block configurations as needed
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { createMutation, updateMutation } = useCrudMutations<any>({
    model: "blocks",
    setSelectedItem: () => {},
    setErrorMessage,
  });

  useEffect(() => {
    setBlocks(initialBlocks); // Sync local state with props on mount/update
  }, [initialBlocks, setBlocks]);

  useEffect(() => {
    if (selectedBlockId) {
      const selectedBlock = initialBlocks.find(
        (block) => block.id === selectedBlockId
      );
      setSelectedItem(selectedBlock || null);
    }
  }, [selectedBlockId, initialBlocks]);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `${Date.now()}`,
      type,
      data: {}, // Initialize with empty object
    };

    let newBlocks = [];
    if (selectedBlockId) {
      const index = initialBlocks.findIndex(
        (block) => block.id === selectedBlockId
      );
      newBlocks = [...initialBlocks];
      newBlocks.splice(index + 1, 0, newBlock);
    } else {
      newBlocks = [...initialBlocks, newBlock];
    }

    setBlocks(newBlocks);
    setSelectedBlockId(newBlock.id);
  };

  const removeBlock = (id: string) => {
    setBlocks(initialBlocks.filter((block) => block.id !== id));
    setSelectedBlockId(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateBlock = (id: string, newData: any) => {
    setBlocks(
      initialBlocks.map((block) =>
        block.id === id ? { ...block, data: newData } : block
      )
    );
  };

  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...initialBlocks];
    [newBlocks[index], newBlocks[index - 1]] = [
      newBlocks[index - 1],
      newBlocks[index],
    ];
    setBlocks(newBlocks);
  };

  const moveBlockDown = (index: number) => {
    if (index === initialBlocks.length - 1) return;
    const newBlocks = [...initialBlocks];
    [newBlocks[index], newBlocks[index + 1]] = [
      newBlocks[index + 1],
      newBlocks[index],
    ];
    setBlocks(newBlocks);
  };

  const handleSaveContent = () => {
    if (initialBlocks.some((block) => block.id)) {
      updateMutation.mutate({ id: "blocks_id", item: initialBlocks });
    } else {
      createMutation.mutate(initialBlocks);
    }
  };

  return (
    <DaisyDrawer
      items={
        <div className="grid grid-cols-2 gap-md p-md">
          {Object.keys(fieldConfigs).map((blockType) => (
            <button
              key={blockType}
              onClick={() => addBlock(blockType as BlockType)}
              className="btn btn-primary  btn-outline"
            >
              Add {blockType.charAt(0).toUpperCase() + blockType.slice(1)}
            </button>
          ))}
          <button onClick={handleSaveContent} className="btn btn-success  col-span-2">
            Save Content
          </button>
        </div>
      }
    >
      <>
        {errorMessage && (
          <div className="alert alert-error mb-4">{errorMessage}</div>
        )}
        <div>
          {initialBlocks.map((block, index) => (
            <div
              key={block.id}
              className={`mb-4 border p-2 ${
                selectedBlockId === block.id
                  ? "border-base-content"
                  : "border-base-content border-dashed border-opacity-30"
              }`}
              onClick={() => setSelectedBlockId(block.id)}
            >
              {selectedBlockId === block.id && (
                <BlockEditorControls
                  block={block}
                  index={index}
                  selectedBlockId={selectedBlockId}
                  setSelectedBlockId={setSelectedBlockId}
                  moveBlockUp={moveBlockUp}
                  moveBlockDown={moveBlockDown}
                  removeBlock={removeBlock}
                />
              )}
              <BlocksRenderer block={block} />
              {selectedBlockId === block.id && selectedItem && (
                <>
                  {/* Modal */}
                  <input
                    type="checkbox"
                    id={`modal-${block.id}`}
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Edit Block</h3>
                      <RenderFormFields
                        config={fieldConfigs[block.type]} // Pass the appropriate configuration
                        selectedItem={selectedItem.data}
                        setSelectedItem={(data) =>
                          updateBlock(block.id, data as Block["data"])
                        }
                      />
                      <div className="modal-action">
                        <label htmlFor={`modal-${block.id}`} className="btn">
                          Close
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </>
    </DaisyDrawer>
  );
};
