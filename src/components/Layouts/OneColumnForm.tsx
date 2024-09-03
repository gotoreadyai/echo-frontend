import React from "react";
import { BlocksRenderer } from "../Blocks/BlocksRenderer";
import { Logo } from "../Logo";
import { LAYOUTS } from "./LAYOUTS";
import { Block } from "../Blocks/Types";
import { FormRenderer } from "../Content/FormRenderer";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OneColumnForm: React.FC<any> = ({ content }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (data: Record<string, any>) => {
    console.log("Form Data:", data);
  };

  return (
    <>
     <div className="py-md bg-base-200">
        <div className="container mx-auto">
          <Logo />
        </div>
      </div>
      <div>
        {content?.[LAYOUTS.OneColumnForm.slots[0]]?.lenght
          ? content[LAYOUTS.OneColumnForm.slots[0]].map(
              (block: Block, index: React.Key | null | undefined) => (
                <div key={index}>
                  <BlocksRenderer block={block} />
                </div>
              )
            )
          : null}
      </div>
      <div>
        {content?.[LAYOUTS.OneColumnForm.slots[1]]?.length ? (
          <FormRenderer
            blocks={content[LAYOUTS.OneColumnForm.slots[1]]}
            onSubmit={handleFormSubmit}
          />
        ) : null}
      </div>
    </>
  );
};

export default OneColumnForm;
