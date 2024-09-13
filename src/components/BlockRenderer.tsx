/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/BlockRenderer.tsx
import React, { useState, useEffect } from "react";
import { blockComponents } from "../data/blocksData";
import { useBlockStore } from "../stores/blockStore";

const BlockRenderer: React.FC<{ block: any }> = ({ block }) => {
  const [Component, setComponent] = useState<React.FC | null>(null);
  const isEditing = useBlockStore((state) => state.isEditing);

  useEffect(() => {
    const loadComponent = async () => {
      const componentLoader =
        blockComponents[`../blocks/${block.filename}.tsx`];
      if (componentLoader) {
        const mod: any = await componentLoader();
        setComponent(() => mod.default);
      } else {
        console.error(`Component not found for block: ${block.filename}`);
      }
    };
    loadComponent();
  }, [block.filename]);

  if (!Component) return <></>;

  return (
    <div className={isEditing ? "" : ""}>
      <Component {...block.data} />
    </div>
  );
};

export default BlockRenderer;
