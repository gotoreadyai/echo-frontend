import React from "react";
import SelectBlock from "../../blocks/SelectBlock";
import { layoutsConfig } from "../../data/layoutsConfig";
import { usePageStore } from "../../stores/pageStore";

// Define the props for LayoutSelector
interface LayoutSelectorProps {
  label: string;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ label }) => {
  // const { layout } = usePageStore((state) => ({
  //   layout: state.pageData.layout,
  // }));

  usePageStore((state) => ({
    layout: state.pageData.layout,
  }));

  const layoutOptions = Object.keys(layoutsConfig).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: key,
  }));

  return (
    <div className="p-md border-b border-base-content border-opacity-30" >
      <SelectBlock label={label} fieldName="layout" options={layoutOptions} />
    </div>
  );
};

export default LayoutSelector;
