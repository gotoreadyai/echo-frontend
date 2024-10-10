import { FieldTemplateProps } from "@rjsf/utils";

export function FieldTemplateDashboard(props: FieldTemplateProps) {
  const { id, help, required, errors, children, schema } = props;
  return (
    <div className={`pb-md`}>
      {schema.type !== "object" && (
        <label htmlFor={id} className={`block text-sm text-base-content pl-xs`}>
          {schema.title}
          {required && <span className="text-danger">*</span>}
        </label>
      )}

      <>{children}</>
      {errors && <div className="form-errors text-danger">{errors}</div>}
      {help && <div className="form-help text-muted">{help}</div>}
    </div>
  );
}
  