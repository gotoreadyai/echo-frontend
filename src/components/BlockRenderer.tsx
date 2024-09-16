/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { blockComponents } from "../data/blocksData";
import { useBlockStore } from "../stores/blockStore";
import { Block } from "../types/types";

interface BlockRendererProps {
  block: Block;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const isEditing = useBlockStore((state) => state.isEditing);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const componentLoader =
          blockComponents[`../blocks/${block.filename}.tsx`];
        if (componentLoader) {
          const mod = await componentLoader() as { default: React.FC<Block> };
          setComponent(() => mod.default);
        } else {
          console.error(`Component not found for block: ${block.filename}`);
        }
      } catch (error) {
        console.error(`Error loading component for block: ${block.filename}`, error);
      }
    };
    loadComponent();
  }, [block.filename]);

  if (!Component) return null;

  return (
    <div className={isEditing ? "" : ""}>
      <Component {...block.data} />
    </div>
  );
};

export default BlockRenderer;
