import { useState, useEffect } from "react";
import { BlocksRenderer } from "../Blocks/BlocksRenderer";
import { Block, BlockType, Content } from "../Blocks/Types";
import { RenderFormFields } from "../CrudManager/RenderFormFields";
import { useCrudMutations } from "../CrudManager/useCrudMutations";
import { BlockEditorControls } from "../Editor/BlockEditorControls";
import DaisyDrawer from "../DaisyDrawer";
import { FiChevronLeft, FiPlus } from "react-icons/fi";
import { useNavAction } from "../useNavAction";
import { FIELD_CONFIG } from "../Blocks/FIELD_CONFIG";

export const  ContentEditor: React.FC<{
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content>>;
}> = ({ content: initialContent, setContent }) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    Object.keys(initialContent)[0]
  );
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Block | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { navAction } = useNavAction();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { updateMutation } = useCrudMutations<any>({
    model: "content",
    setSelectedItem: () => {},
    setErrorMessage,
  });

  useEffect(() => {
    setSelectedBlockId(null);
    setSelectedItem(null);
  }, [selectedTab]);

  useEffect(() => {
    if (selectedBlockId) {
      const selectedBlock = initialContent[selectedTab].find(
        (block) => block.id === selectedBlockId
      );
      setSelectedItem(selectedBlock || null);
    }
  }, [selectedBlockId, initialContent, selectedTab]);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `${Date.now()}`,
      type,
      data: {}, // Initialize with empty object
    } as Block;

    const newBlocks = [...initialContent[selectedTab], newBlock];
    setContent({
      ...initialContent,
      [selectedTab]: newBlocks,
    });
    setSelectedBlockId(newBlock.id);
  };

  const removeBlock = (id: string) => {
    setContent({
      ...initialContent,
      [selectedTab]: initialContent[selectedTab].filter(
        (block) => block.id !== id
      ),
    });
    setSelectedBlockId(null);
  };

  const updateBlock = (id: string, newData: Block["data"]) => {
    setContent({
      ...initialContent,
      [selectedTab]: initialContent[selectedTab].map((block) =>
        block.id === id ? { ...block, data: newData } : block
      ),
    });
  };

  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...initialContent[selectedTab]];
    [newBlocks[index], newBlocks[index - 1]] = [
      newBlocks[index - 1],
      newBlocks[index],
    ];
    setContent({
      ...initialContent,
      [selectedTab]: newBlocks,
    });
  };

  const moveBlockDown = (index: number) => {
    if (index === initialContent[selectedTab].length - 1) return;
    const newBlocks = [...initialContent[selectedTab]];
    [newBlocks[index], newBlocks[index + 1]] = [
      newBlocks[index + 1],
      newBlocks[index],
    ];
    setContent({
      ...initialContent,
      [selectedTab]: newBlocks,
    });
  };

  const handleSaveContent = () => {
    console.log(initialContent);
    updateMutation.mutate({ id: "content_id", item: initialContent });
  };

  return (
    <DaisyDrawer
      items={
        <div className="grid grid-cols-2 gap-md p-md">
          {Object.keys(FIELD_CONFIG).map((blockType) => (
            <button
              key={blockType}
              onClick={() => addBlock(blockType as BlockType)}
              className="btn btn-outline font-thin text-xs"
            >
              <FiPlus /> {blockType.charAt(0).toUpperCase() + blockType.slice(1)}
            </button>
          ))}
          <button
            onClick={handleSaveContent}
            className="btn btn-success col-span-2"
          >
            Save Content
          </button>
        </div>
      }
    >
      <>
        <div className="flex gap-sm items-center pb-sm">
          <div className="btn" onClick={() => navAction("", "view")}>
            <FiChevronLeft />
          </div>
          <div className="tabs">
            {Object.keys(initialContent).map((tab) => (
              <a
                key={tab}
                className={`tab tab-bordered ${
                  selectedTab === tab ? "tab-active" : ""
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </a>
            ))}
          </div>
        </div>

        {errorMessage && (
          <div className="alert alert-error mb-4">{errorMessage}</div>
        )}
        <div className="pt-sm">
          {initialContent[selectedTab].map((block, index) => (
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
                        config={FIELD_CONFIG[block.type]} // Pass the appropriate configuration
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
