/* eslint-disable @typescript-eslint/no-explicit-any */



   export interface SchemaValue {
        references?: any;
        onDelete?: string;
        onUpdate?: string;
        type:string,
        allowNull: boolean;

      }