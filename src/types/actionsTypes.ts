/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SchemaValue {
  references?: any;
  onDelete?: string;
  onUpdate?: string;
  type: string;
  allowNull: boolean;
}

export interface NavigationOptions {
  clearQueryString?: boolean;
  queryParams?: Record<string, any>;
  pathParams?: Record<string, string>;
  clearParams?: string[];
  allowMany?: boolean;
}


export interface ActionItem {
  scope: string;
  action: string;
  arguments?: string;
}

export interface FetchItemsActionProps {
  scope: string;
  onActionComplete: () => void;
}