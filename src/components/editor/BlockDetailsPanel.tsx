/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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


const blockSchemas = import.meta.glob("../../blocks/*.ts");

const BlockDetailsPanel: React.FC = () => {
  const {
    selectedBlock,
    selectedSlot,
    setBlockData,
    removeBlock,
    moveBlock,
    deselectBlock,
  } = useBlockStore((state) => ({
    selectedBlock: state.selectedBlock,
    selectedSlot: state.selectedSlot,
    setBlockData: state.setBlockData,
    removeBlock: state.removeBlock,
    moveBlock: state.moveBlock,
    deselectBlock: state.deselectBlock,
  }));

  const [schema, setSchema] = useState<JSONSchema7 | null>(null);

  useEffect(() => {
    if (selectedBlock) {
      const loadSchema = async () => {
        const blockSchemaKey = `../../blocks/${selectedBlock.filename}Schema.ts`;
        if (blockSchemas[blockSchemaKey]) {
          const module = await blockSchemas[blockSchemaKey]();
          const schemaModule = module as {
            default: { jsonSchema: JSONSchema7 };
          };
          setSchema(schemaModule.default.jsonSchema); // Assuming schema is exported as default
        } else {
          setSchema(null); // Schema not found for block
        }
      };

      loadSchema();
    }
  }, [selectedBlock]);

  const handleChange = (e: IChangeEvent) => {
    // Handle the form data change
    if (!selectedBlock) return;
    setBlockData(selectedBlock.id, e.formData);
  };

  // const handleBlur = (e: any) => {
  //   if (!selectedBlock) return; // Add a null check here
  //   const formElement = e.target?.closest("form");
  //   const formData = new FormData(formElement);
  //   const jsonFormData = Object.fromEntries(formData.entries());
  //   console.log("Blur event:", jsonFormData);
  //   setBlockData(selectedBlock.id, jsonFormData);
  // };

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
        // onBlur={handleBlur}
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
