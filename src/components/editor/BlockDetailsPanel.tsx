// src/components/editor/BlockDetailsPanel.tsx
import React, { useEffect, useState } from "react";
import { useBlockStore } from "../../stores/blockStore";
import Form, { IChangeEvent } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { JSONSchema7 } from "json-schema";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";
import {
  ArrayFieldTemplate,
  BaseInputTemplate,
  CustomSelectWidget,
  DescriptionFieldTemplate,
  FieldTemplate,
  TitleFieldTemplate,
} from "./FormUI";
import { CloseRight } from ".";
import { BlockDefinition } from "../../types/types";

const   blockSchemas = import.meta.glob<BlockDefinition>(
  "../../blocks/*Schema.ts",
  { eager: true }
);

const BlockDetailsPanel: React.FC = () => {
  const {
    selectedBlock,
    selectedSlot,
    setBlockData,
    removeBlock,
    moveBlock,
    deselectBlock,
  } = useBlockStore();

  const [schema, setSchema] = useState<JSONSchema7 | null>(null);

  useEffect(() => {
    if (selectedBlock) {
      const blockSchemaKey = `../../blocks/${selectedBlock.filename}Schema.ts`;
      const blockSchema = blockSchemas[blockSchemaKey]?.default;
      if (blockSchema) {
        setSchema(blockSchema.jsonSchema as JSONSchema7 | null);
      } else {
        setSchema(null);
      }
    }
  }, [selectedBlock]);

  const handleChange = (e: IChangeEvent) => {
    if (!selectedBlock) return;
    setBlockData(selectedBlock.id, e.formData);
  };

  const widgets = {
    SelectWidget: CustomSelectWidget,
  };

  if (!selectedBlock) return <div className="p-4">No block selected</div>;
  if (!schema) return <div className="p-4">Loading block schema...</div>;

  return (
    <>
      <CloseRight
        label={selectedBlock.filename}
        callback={() => {
          deselectBlock();
        }}
      />

      <Form
        schema={schema}
        validator={validator}
        formData={selectedBlock.data}
        onChange={handleChange}
        uiSchema={{
          "ui:submitButtonOptions": { norender: true },
        }}
        templates={{
          BaseInputTemplate,
          TitleFieldTemplate,
          ArrayFieldTemplate,
          DescriptionFieldTemplate,
          FieldTemplate,
        }}
        widgets={widgets}
      />

      <div className="flex gap-2 p-md border-b border-base-300">
        <button
          className="btn btn-outline btn-sm"
          onClick={() =>
            selectedSlot && moveBlock(selectedBlock.id, selectedSlot, "up")
          }
        >
          <FiArrowUp /> Move Up
        </button>

        <button
          className="btn btn-outline btn-sm"
          onClick={() =>
            selectedSlot && moveBlock(selectedBlock.id, selectedSlot, "down")
          }
        >
          <FiArrowDown /> Move Down
        </button>

        <button
          className="btn btn-outline btn-sm text-red-600"
          onClick={() =>
            selectedSlot && removeBlock(selectedBlock.id, selectedSlot)
          }
        >
          <FiTrash2 /> Delete Block
        </button>
      </div>
    </>
  );
};

export default BlockDetailsPanel;
