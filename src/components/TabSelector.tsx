import React from 'react';

interface TabSelectorProps {
  activeTab: 'content' | 'form';
  setActiveTab: (tab: 'content' | 'form') => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div role="tablist" className="tabs tabs-lifted pt-sm bg-base-200">
      <a
        role="tab"
        className={`tab ${activeTab === 'content' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('content')}
      >
        Content
      </a>
      <a
        role="tab"
        className={`tab ${activeTab === 'form' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('form')}
      >
        Form
      </a>
    </div>
  );
};

export default TabSelector;
