import React, { useState } from "react";
import JSONBlock from "./JSONBlock";
import { usePageStore } from "../../stores/pageStore";
import { useBlockStore } from "../../stores/blockStore";
import { useGlobalStore } from "../../stores/globalStore"; // Import globalStore hook

const ScopePanel: React.FC = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<'initialScope' | 'actualScope' | 'slotsPreview' | 'globalScope'>('initialScope');

  // Fetch data from pageStore, blockStore, and globalStore
  const initialScope = usePageStore((state) => state.initialScope);
  const pageData = usePageStore((state) => state.pageData);
  const slots = useBlockStore((state) => state.slots);
  const globalScope = useGlobalStore((state) => state.globalScope());

  const handleChange = (value: object) => {
    console.log(value); // Implement logic for updating if necessary
  };

  // Determine the value to display based on the active tab
  let jsonValue;
  if (activeTab === 'initialScope') {
    jsonValue = initialScope;
  } else if (activeTab === 'actualScope') {
    jsonValue = pageData;
  } else if (activeTab === 'slotsPreview') {
    jsonValue = slots;
  } else if (activeTab === 'globalScope') {
    jsonValue = globalScope;
  }

  return (
    <div className="w-full sticky top-16">
      {/* Tabs to switch between scopes */}
      <div className="tabs tabs-lifted border-b border-base-200 mt-sm">
        <button
          className={`tab ${activeTab === 'initialScope' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('initialScope')}
        >
          Initial Scope
        </button>
        <button
          className={`tab ${activeTab === 'actualScope' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('actualScope')}
        >
          Actual Scope
        </button>
        <button
          className={`tab ${activeTab === 'slotsPreview' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('slotsPreview')}
        >
          Slots Preview
        </button>
        <button
          className={`tab ${activeTab === 'globalScope' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('globalScope')}
        >
          Global Scope
        </button>
      </div>

      {/* Display data in JSONBlock depending on the selected tab */}
      <JSONBlock
        id="json-block-id"
        label={
          activeTab === 'initialScope'
            ? "Page scope range"
            : activeTab === 'actualScope'
            ? "Actual page scope"
            : activeTab === 'slotsPreview'
            ? "Slots Preview"
            : "Global Scope"
        }
        value={jsonValue || {}} // Load data based on the active tab
        isRequired={true}
        onChange={handleChange}
      />

      <div className="p-sm">
        <button className="btn btn-success btn-outline w-full">
          Update page scope
        </button>
      </div>
    </div>
  );
};

export default ScopePanel;
