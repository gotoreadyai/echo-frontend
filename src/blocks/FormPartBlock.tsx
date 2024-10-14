/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useCallback } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CustomFormTemplate from "../components/formWidgets/CustomObjectFieldTemplate";
import { FieldTemplateDashboard } from "../components/formWidgets/FieldTemplateDashboard";
import { ArrayFieldTemplateDashboard } from "../components/formWidgets/ArrayFieldTemplateDashboard";
import { BaseInputTemplateDashboard } from "../components/formWidgets/BaseInputTemplateDashboard";
import { TitleFieldTemplate } from "../components/formWidgets/TitleFieldTemplate";
import { usePageStore } from "../stores";

interface FormPartBlockProps {
  className?: string;
  schemaScope: string;
  dataScope: string;
}

export const FormPartBlock: React.FC<FormPartBlockProps> = ({
  className,
  schemaScope,
  dataScope,
}) => {
  const { schema, data, updateData } = usePageStore((state) => ({
    schema: state.getFieldValue(schemaScope),
    data: state.getFieldValue(dataScope),
    updateData: state.updateField,
  }));

  useEffect(() => {
    // Initialize form data in Zustand if not already set
    if (data === undefined || data === null) {
      updateData(dataScope, {});
    }
  }, [dataScope, data, updateData]);

  const handleChange = useCallback(
    (e: any) => {
      updateData(dataScope, e.formData);
    },
    [dataScope, updateData]
  );

  if (
    !schema ||
    typeof schema !== "object" ||
    Array.isArray(schema) ||
    Object.keys(schema).length === 0
  ) {
    return (
      <div className={`${className} container mx-auto select-none`}>
        Invalid schema
      </div>
    );
  }

  return (
    <div className={`${className} container mx-auto select-none`}>
      <Form
        schema={schema}
        validator={validator}
        formData={data}
        onChange={handleChange}
        templates={{
          TitleFieldTemplate: TitleFieldTemplate,
          ArrayFieldTemplate: ArrayFieldTemplateDashboard,
          BaseInputTemplate: BaseInputTemplateDashboard,
          FieldTemplate: FieldTemplateDashboard,
          ObjectFieldTemplate: CustomFormTemplate, // Custom FormTemplate
        }}
      />
    </div>
  );
};

export default FormPartBlock;
