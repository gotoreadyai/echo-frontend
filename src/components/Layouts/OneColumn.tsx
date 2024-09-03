import React from "react";
import { BlocksRenderer } from "../Blocks/BlocksRenderer";
import { Logo } from "../Logo";
import { LAYOUTS } from "./LAYOUTS";
import { Block } from "../Blocks/Types";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OneColumn: React.FC<any> = ({ content }) => {
  return (
    <>
      <div className="py-md bg-base-200 border-b border-solid border-base-300">
        <div className="container mx-auto">
          <Logo />
        </div>
      </div>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/10"
        ></div>
      </div>
      <div className="flex flex-col gap-md py-md">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          content?.[LAYOUTS.OneColumn.slots[0] as any]
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (content[LAYOUTS.OneColumn.slots[0] as any].map(
                (block: Block, index: React.Key | null | undefined) => (
                  <div key={index}>
                    <BlocksRenderer block={block} />
                  </div>
                )
              ) as never)
            : null
        }
      </div>
    </>
  );
};

export default OneColumn;
