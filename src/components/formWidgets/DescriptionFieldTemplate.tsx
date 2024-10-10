import { DescriptionFieldProps } from "@rjsf/utils";

export function DescriptionFieldTemplate(props: DescriptionFieldProps) {
    const { description, id } = props;
    const isRootLevel = id.split("_");
  
    return (
      description && (
        <div
          id={id}
          className={`text-xs p-sm   ${
            isRootLevel[1]
              ? "bg-base-200 -mx-xs pt-0"
              : "border border-l-4 border-secondary p-xl m-xs"
          }`}
        >
          {description}
        </div>
      )
    );
  }
  