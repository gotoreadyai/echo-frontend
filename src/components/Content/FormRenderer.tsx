import React, { useState } from "react";
import { BlocksRenderer } from "../Blocks/BlocksRenderer";
import { Block } from "../Blocks/Types";

interface FormRendererProps {
  blocks: Block[];
  onSubmit: (
    data: Record<string, string | number | boolean | object | null>
  ) => void;
}

// Define a more specific type for form data
type FormData = Record<string, string | number | boolean | object | null>;

export const FormRenderer: React.FC<FormRendererProps> = ({
  blocks,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (
    id: string,
    value: string | number | boolean | object | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleButtonClick = () => {
    onSubmit(formData);
  };

  const renderBlock = (block: Block) => {
    const blockProps = {
      ...block.data,
      onChange: (value: string | number | boolean | object | null) =>
        handleChange(block.id, value),
    };

    if (block.type === "formButton") {
      return (
        <BlocksRenderer
          key={block.id}
          block={{
            ...block,
            data: {
              ...block.data,
              onClick: handleButtonClick, // Przekazanie własnej funkcji onClick
            },
          }}
        />
      );
    }

    switch (block.type) {
      case "formTextInput":
      case "formTextarea":
      case "formJSONInput":
      case "formSelectInput":
      case "formRelationInput":
        return (
          <BlocksRenderer
            key={block.id}
            block={{ ...block, data: blockProps }}
          />
        );
      default:
        return <BlocksRenderer key={block.id} block={block} />;
    }
  };

  return (
    <div>
      {blocks.map((block) => (
        <div key={block.id}>{renderBlock(block)}</div>
      ))}
      
    </div>
  );
};
