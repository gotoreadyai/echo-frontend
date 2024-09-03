import React from "react";
import { Block } from "../Blocks/Types";
import { FormRenderer } from "./FormRenderer";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleFormSubmit = (data: Record<string, any>) => {
  console.log("Form Data:", data);
};

// Main Component to render content
export const ContentRenderer: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  return (
    <>
     <FormRenderer blocks={blocks} onSubmit={handleFormSubmit} />
      {/* {blocks.map((block, index) => (
        <div key={index}>
          
          <BlocksRenderer block={block} />
        </div>
      ))} */}
    </>
  );
};
