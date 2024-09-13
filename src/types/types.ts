/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";

export interface Block {
  icon: ReactNode;
  id: string;
  filename: string;
  data: any;
}

export interface BlockDefinition extends Block {
  jsonSchema: any;
  icon: any;
  group: string;
}

export interface BlockAttributesProps {
  block: Block;
  onChange: (blockId: number, data: Record<string, any>) => void;
  onClose?: () => void;
  onEdit?: (formData: any) => void;
}

export type LayoutConfig = {
  id: string;
  component: any;
  slots: string[];
  parentSlots: string[];
};
export interface PathParams {
  [key: string]: string | undefined;
}

export type MutationSuccessHandler = () => void;
