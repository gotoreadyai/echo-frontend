import React, { Suspense } from "react";
import { Block } from "../types/types";
import { useDynamicImport } from "../hooks/useDynamicImport";


interface BlockRendererProps {
  block: Block;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const BlockComponent = useDynamicImport(`../blocks/${block.filename}`, "../blocks/DefaultBlock");

  if (!BlockComponent) {
    return <div className="sticky top-0 text-base-100 w-full">Nie udało się załadować komponentu.</div>;
  }

  return (
    <Suspense fallback={<></>}>
      <BlockComponent key={block.id} {...block.data} />
    </Suspense>
  );
};

export default BlockRenderer;
