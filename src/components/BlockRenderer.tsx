/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { useBlockStore } from "../stores/blockStore";
import { Block } from "../types/types";

interface BlockRendererProps {
  block: Block;
}

interface BlockData {}
const componentCache: Record<
  string,
  React.LazyExoticComponent<React.FC<BlockData>> | null
> = {};

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const isEditing = useBlockStore((state) => state.isEditing);
  let LazyComponent: React.LazyExoticComponent<React.FC<BlockData>> | null =
    componentCache[block.filename];

  if (!LazyComponent) {
    LazyComponent = React.lazy(() =>
      import(`../blocks/${block.filename}.tsx`)
        .then((module) => ({ default: module.default as React.FC<BlockData> }))
        .catch((error) => {
          console.error(
            `Błąd podczas ładowania komponentu dla bloku: ${block.filename}`,
            error
          );
          return {
            default: () => <div>Nie udało się załadować komponentu.</div>,
          };
        })
    );
    componentCache[block.filename] = LazyComponent;
  }

  return (
    <div className={isEditing ? "editing-class" : "view-class"}>
      <Suspense fallback={<div>Ładowanie...</div>}>
        <LazyComponent {...block.data} />
      </Suspense>
    </div>
  );
};

export default BlockRenderer;
