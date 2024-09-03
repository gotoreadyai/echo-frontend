import { useState, useEffect } from "react";
import { BlocksRenderer } from "../Blocks/BlocksRenderer";
import { Block, BlockType, Content } from "../Blocks/Types";
import { RenderFormFields } from "../CrudManager/RenderFormFields";
import { useCrudMutations } from "../CrudManager/useCrudMutations";
import { BlockEditorControls } from "../Editor/BlockEditorControls";
import DaisyDrawer from "../DaisyDrawer";
import { FiChevronLeft } from "react-icons/fi";
import { useNavAction } from "../useNavAction";

import { FIELD_CONFIG } from "../Blocks/FIELD_CONFIG";
import TabSelector from "../TabSelector";
import BlockButtonGrid from "../Editor/BlockButtonGrid";
import { CrudManagerParams } from "../CrudManager/Types";
import { useParams } from "react-router-dom";

export const ContentEditor: React.FC<{
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content>>;
}> = ({ content: initialContent, setContent }) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    Object.keys(initialContent)[0]
  );
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Block | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "form">("content");
  const { navAction } = useNavAction();
  const { model, workspace } = useParams<CrudManagerParams>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { updateContentMutation } = useCrudMutations<any>({
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
      data: {}, // Initialize with an empty object
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
    console.log(initialContent[selectedTab], model, workspace);
    updateContentMutation.mutate({
      model: "document",
      slug: model || "",
      slot: selectedTab,
      content: initialContent[selectedTab],
    });
  };

  return (  
    <DaisyDrawer
      items={
        <>
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
          <BlockButtonGrid
            activeTab={activeTab}
            addBlock={addBlock}
            handleSaveContent={handleSaveContent}
          />
        </>
      }
    >
      <>
        <div className="flex gap-sm items-center pb-sm">
          <div className="btn" onClick={() => navAction("", "view")}>
            <FiChevronLeft />
          </div>
          <div className="tabs tabs-lifted">
            {Object.keys(initialContent).map((tab) => (
              <a
                key={tab}
                className={`tab tab-bordered ${
                  selectedTab === tab ? "tab-active" : ""
                }`}
                onClick={() => {
                  setSelectedTab(tab);
                  navAction("", "edit-blocks", tab, "0");
                }}
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
              className={`mb-4 border p-2 relative ${
                selectedBlockId === block.id
                  ? "border-neutral"
                  : "border-neutral-content border-dashed border-opacity-30"
              }`}
              onClick={() => setSelectedBlockId(block.id)}
              onDoubleClick={() =>
                document.getElementById(`modal-${block.id}`)?.click()
              } // Open modal on double-click
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
                  <div className="modal ">
                    <div className="modal-box h-full w-92 ">
                      <h3 className="font-bold text-lg">Edit Block</h3>
                      <RenderFormFields
                        config={FIELD_CONFIG[block.type].config} // Pass the appropriate configuration
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
