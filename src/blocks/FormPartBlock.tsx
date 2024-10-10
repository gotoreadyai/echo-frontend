/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useCallback } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CustomFormTemplate from "../components/formWidgets/CustomObjectFieldTemplate";
import { FieldTemplateDashboard } from "../components/formWidgets/FieldTemplateDashboard";
import { ArrayFieldTemplateDashboard } from "../components/formWidgets/ArrayFieldTemplateDashboard";
import { BaseInputTemplateDashboard } from "../components/formWidgets/BaseInputTemplateDashboard";
import { TitleFieldTemplate } from "../components/formWidgets/TitleFieldTemplate";

interface FormPartBlockProps {
  className?: string;
}

export const FormPartBlock: React.FC<FormPartBlockProps> = ({ className }) => {
  const [formData, setFormData] = useState<any>({
    title: "Chemia molekularna",
    departamentId: "1",
    courseLevelId: "1",
    topics: [],
  });
  const handleChange = useCallback((e: any) => {
    setFormData(e.formData);
  }, []);

  return (
    <div className={`${className} container mx-auto select-none`}>
      <Form
        schema={{
          title: "Example Form",
          type: "object",
          properties: {
            title: { type: "string", title: "Tytuł podrecznika" },
            departamentId: { type: "string", title: "Index zagadnienia" },
            courseLevelId: { type: "string", title: "Index poziomu nauczania" },
            topics: {
              type: "array",
              title: "Tematy",
              items: {
                type: "object",
                properties: {
                  label: { type: "string", title: "Zagadnienie" },
                  key: { type: "string", title: "Index" },
                },
              },
            },
          },
        }}
        validator={validator}
        formData={formData}
        onChange={handleChange}
        templates={{
          
          TitleFieldTemplate: TitleFieldTemplate,
          ArrayFieldTemplate: ArrayFieldTemplateDashboard,
          BaseInputTemplate: BaseInputTemplateDashboard,
          FieldTemplate: FieldTemplateDashboard,
          ObjectFieldTemplate: CustomFormTemplate, // Przekazujemy własny FormTemplate
        }}
       
      />
    </div>
  );
};

export default FormPartBlock;
