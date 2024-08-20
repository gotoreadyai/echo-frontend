import React, { useState } from "react";
import "daisyui";
import { ContentRenderer } from "./ContentRenderer";
import { Block, BlockType } from "./Blocks/Types";

// Component for editing blocks
export const ContentEditor: React.FC<{
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}> = ({ blocks, setBlocks }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `${Date.now()}`,
      type,
      data: getDefaultBlockData(type),
    };

    let newBlocks = [];
    if (selectedBlockId) {
      const index = blocks.findIndex((block) => block.id === selectedBlockId);
      newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock);
    } else {
      newBlocks = [...blocks, newBlock];
    }

    setBlocks(newBlocks);
    setSelectedBlockId(newBlock.id); // Automatically select the newly added block
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
    setSelectedBlockId(null);
  };

  const updateBlock = (id: string, newData: any) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, data: newData } : block
      )
    );
  };

  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index - 1]] = [
      newBlocks[index - 1],
      newBlocks[index],
    ];
    setBlocks(newBlocks);
  };

  const moveBlockDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [
      newBlocks[index + 1],
      newBlocks[index],
    ];
    setBlocks(newBlocks);
  };

  const getDefaultBlockData = (type: BlockType) => {
    switch (type) {
      case "text":
        return { content: "New text content" };
      case "image":
        return {
          src: "https://via.placeholder.com/150",
          alt: "Placeholder image",
        };
      case "heading":
        return { level: 1, content: "New Heading" };
      case "quote":
        return { content: "New Quote", author: "Author Name" };
      case "list":
        return { items: ["Item 1", "Item 2"], ordered: false };
      default:
        return {};
    }
  };

  const renderEditForm = (block: Block) => {
    switch (block.type) {
      case "text":
        return (
          <input
            type="text"
            value={block.data.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="border p-2 w-full"
          />
        );
      case "image":
        return (
          <div>
            <input
              type="text"
              value={block.data.src}
              onChange={(e) =>
                updateBlock(block.id, { ...block.data, src: e.target.value })
              }
              className="border p-2 w-full"
              placeholder="Image URL"
            />
            <input
              type="text"
              value={block.data.alt}
              onChange={(e) =>
                updateBlock(block.id, { ...block.data, alt: e.target.value })
              }
              className="border p-2 w-full mt-2"
              placeholder="Alt text"
            />
          </div>
        );
      case "heading":
        return (
          <div>
            <input
              type="number"
              value={block.data.level}
              onChange={(e) =>
                updateBlock(block.id, {
                  ...block.data,
                  level: Number(e.target.value),
                })
              }
              className="border p-2 w-full"
              placeholder="Heading level"
            />
            <input
              type="text"
              value={block.data.content}
              onChange={(e) =>
                updateBlock(block.id, {
                  ...block.data,
                  content: e.target.value,
                })
              }
              className="border p-2 w-full mt-2"
              placeholder="Heading content"
            />
          </div>
        );
      case "quote":
        return (
          <div>
            <textarea
              value={block.data.content}
              onChange={(e) =>
                updateBlock(block.id, {
                  ...block.data,
                  content: e.target.value,
                })
              }
              className="border p-2 w-full"
              placeholder="Quote content"
            />
            <input
              type="text"
              value={block.data.author}
              onChange={(e) =>
                updateBlock(block.id, { ...block.data, author: e.target.value })
              }
              className="border p-2 w-full mt-2"
              placeholder="Author"
            />
          </div>
        );
      case "list":
        return (
          <div>
            <textarea
              value={block.data.items.join("\n")}
              onChange={(e) =>
                updateBlock(block.id, {
                  ...block.data,
                  items: e.target.value.split("\n"),
                })
              }
              className="border p-2 w-full"
              placeholder="List items (one per line)"
            />
            <label className="mt-2 block">
              <input
                type="checkbox"
                checked={block.data.ordered}
                onChange={(e) =>
                  updateBlock(block.id, {
                    ...block.data,
                    ordered: e.target.checked,
                  })
                }
              />
              Ordered List
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => addBlock("text")}
          className="btn btn-primary mr-2"
        >
          Add Text
        </button>
        <button
          onClick={() => addBlock("image")}
          className="btn btn-primary mr-2"
        >
          Add Image
        </button>
        <button
          onClick={() => addBlock("heading")}
          className="btn btn-primary mr-2"
        >
          Add Heading
        </button>
        <button
          onClick={() => addBlock("quote")}
          className="btn btn-primary mr-2"
        >
          Add Quote
        </button>
        <button
          onClick={() => addBlock("list")}
          className="btn btn-primary mr-2"
        >
          Add List
        </button>
      </div>
      <div>
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={`mb-4 border p-2 ${
              selectedBlockId === block.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedBlockId(block.id)}
          >
            {selectedBlockId === block.id && (
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => moveBlockUp(index)}
                  className="btn btn-secondary mr-2"
                >
                  Up
                </button>
                <button
                  onClick={() => moveBlockDown(index)}
                  className="btn btn-secondary mr-2"
                >
                  Down
                </button>
                <button
                  onClick={() => removeBlock(block.id)}
                  className="btn btn-error mr-2"
                >
                  Remove
                </button>
                <label
                  htmlFor={`modal-${block.id}`}
                  className="btn btn-primary"
                >
                  Edit
                </label>
              </div>
            )}
            <ContentRenderer blocks={[block]} />
            {selectedBlockId === block.id && (
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
                    {renderEditForm(block)}
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
    </div>
  );
};
