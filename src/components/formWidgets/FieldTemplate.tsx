import { FieldTemplateProps } from "@rjsf/utils";

export function FieldTemplate(props: FieldTemplateProps) {
    const { id, help, required, description, errors, children, schema } = props;
    const isRootLevel = id.split("_").length === 2;
  
    return (
      <div className={`border-base-300 ${isRootLevel && "border-b-8"}`}>
        {schema.label && schema.type && (
          <label
            htmlFor={id}
            className={`block form-label text-sm font-semibold text-base-content/80 ${
              isRootLevel ? "bg-base-200 p-sm pt-md" : "px-sm pt-md"
            }`}
          >
            {schema.label}
            {required && <span className="text-danger">*</span>}
          </label>
        )}
        {schema.description && schema.type && (
          <div className={`px-xs`}>{description}</div>
        )}
        <>{children}</>
        {errors && <div className="form-errors text-danger">{errors}</div>}
        {help && <div className="form-help text-muted">{help}</div>}
      </div>
    );
  }