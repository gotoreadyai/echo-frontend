/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SelectBlockProps {
    label: string;
    scope?: string;
    fieldName: string;
    filterName?: string;
    options?: any[];
    scopeKey?: string;
    className?: string;
    readonly?: boolean;
    returnKey?: string;
    sendName?: string
  }