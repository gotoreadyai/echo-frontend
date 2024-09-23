/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/types.ts
import { ElementType } from "react";
import { JSONSchema7 } from "json-schema";

export interface Block {
  id: string;
  filename: string;
  data: Record<string, unknown>;
}

export interface BlockDefinition {
  id?: string;
  filename: string;
  jsonSchema: JSONSchema7;
  icon: ElementType;
  group: string;
  data?: Record<string, unknown>;
  default?: Record<string, unknown>;
  preview?: string
}

export interface BlockAttributesProps {
  block: Block;
  onChange: (blockId: string, data: Record<string, unknown>) => void;
  onClose?: () => void;
  onEdit?: (formData: Record<string, unknown>) => void;
}

export interface LayoutConfig {
  id: string;
  component: React.FC<any>;
  slots: string[];
  parentSlots: string[];
}

export interface PathParams {
  [key: string]: string | undefined;
}

export type MutationSuccessHandler = () => void;

export interface FetchItemsActionProps {
  scope: string;
  onActionResult: (stste: boolean) => void;
}