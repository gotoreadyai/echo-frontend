// src/components/SlotsRenderer.tsx
import { FC } from "react";

import { Block, PathParams } from "../types/types";
import { editConditions } from "../utils/layoutRendererConditions";
import SlotsEditableRenderer from "./SlotsEditableRenderer";
import SlotsRenderer from "./SlotsRenderer";
import { useParams } from "react-router-dom";

interface SlotsRendererProps {
  slots: Record<string, Block[]>;
  slotName: string;
}

const SlotWrapper: FC<SlotsRendererProps> = ({ slots, slotName }) => {
  const { action } = useParams<PathParams>();
  return editConditions(action) ? (
    <SlotsEditableRenderer slots={slots} slotName={slotName} />
  ) : (
    <SlotsRenderer slots={slots} slotName={slotName} />
  );
};

export default SlotWrapper;
