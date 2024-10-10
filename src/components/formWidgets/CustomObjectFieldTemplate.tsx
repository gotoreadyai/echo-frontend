import { ObjectFieldTemplateProps } from "@rjsf/utils";
import React from "react";

const CustomObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = ({
  description,
  properties,
}) => {
  return (
    <div className="custom-object-field-wrapper">
      {description}
      <div className="form-properties">
        {properties.map((prop) => prop.content)}
      </div>
    </div>
  );
};

export default CustomObjectFieldTemplate;
