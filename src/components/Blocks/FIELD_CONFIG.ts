import { FieldConfig } from "../CrudManager/Types";
import FormJSONInputBlock from "./Form/FormJSONInputBlock";
import FormRelationInputBlock from "./Form/FormRelationInputBlock";
import FormSelectInputBlock from "./Form/FormSelectInputBlock";
import FormTextareaBlock from "./Form/FormTextareaInputBlock";
import FormTextInputBlock from "./Form/FormTextInputBlock";
import { HeadingBlock } from "./Content/HeadingBlock";
import { ImageBlock } from "./Content/ImageBlock";
import { ListBlock } from "./Content/ListBlock";
import { QuoteBlock } from "./Content/QuoteBlock";
import { TextBlock } from "./Content/TextBlock";
import { LinkBlock } from "./Content/LinkBlock";
import { FormButtonBlock } from "./Form/FormButtonBlock";

export const FIELD_CONFIG: Record<
  string,
  {
    config: Record<string, FieldConfig>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.FC<any>;
    componentType: 'content' | 'form' ;
  }
> = {
  text: {
    config: {
      content: { type: "TEXT", label: "Content", allowNull: false },
    },
    component: TextBlock,
    componentType: "content",
  },
  image: {
    config: {
      src: { type: "TEXT", label: "Image URL", allowNull: false },
      alt: { type: "TEXT", label: "Alt Text", allowNull: true },
    },
    component: ImageBlock,
    componentType: "content",
  },
  heading: {
    config: {
      content: { type: "TEXT", label: "Heading Content", allowNull: false },
      level: { type: "TEXT", label: "Heading Level", allowNull: false },
    },
    component: HeadingBlock,
    componentType: "content",
  },
  quote: {
    config: {
      content: { type: "TEXT", label: "Quote Content", allowNull: false },
      author: { type: "TEXT", label: "Author", allowNull: true },
    },
    component: QuoteBlock,
    componentType: "content",
  },
  list: {
    config: {
      items: { type: "TEXT", label: "List Items", allowNull: false },
      ordered: { type: "TEXT", label: "Ordered List", allowNull: true },
    },
    component: ListBlock,
    componentType: "content",
  },
  link: {
    config: {
      to: { type: "TEXT", label: "Link URL", allowNull: false },
      text: { type: "TEXT", label: "Link Text", allowNull: false },
      target: { type: "TEXT", label: "Target (optional)", allowNull: true },
    },
    component: LinkBlock,
    componentType: "content",
  },
  formTextInput: {
    config: {
      id: { type: "TEXT", label: "Field ID", allowNull: false },
      label: { type: "TEXT", label: "Label", allowNull: false },
      value: { type: "TEXT", label: "Initial Value", allowNull: true },
      isRequired: { type: "BOOLEAN", label: "Is Required", allowNull: false },
    },
    component: FormTextInputBlock,
    componentType: "form",
  },
  formTextarea: {
    config: {
      id: { type: "TEXT", label: "Field ID", allowNull: false },
      label: { type: "TEXT", label: "Label", allowNull: false },
      value: { type: "TEXT", label: "Initial Value", allowNull: true },
      isRequired: { type: "BOOLEAN", label: "Is Required", allowNull: false },
    },
    component: FormTextareaBlock,
    componentType: "form",
  },
  formSelectInput: {
    config: {
      id: { type: "TEXT", label: "Field ID", allowNull: false },
      label: { type: "TEXT", label: "Label", allowNull: false },
      value: { type: "TEXT", label: "Selected Value", allowNull: true },
      options: {
        type: "TEXT",
        label: "Options (comma-separated)",
        allowNull: false,
      },
      isRequired: { type: "BOOLEAN", label: "Is Required", allowNull: false },
    },
    component: FormSelectInputBlock,
    componentType: "form",
  },
  formRelationInput: {
    config: {
      id: { type: "TEXT", label: "Field ID", allowNull: false },
      label: { type: "TEXT", label: "Label", allowNull: false },
      value: { type: "TEXT", label: "Initial Value", allowNull: true },
      isRequired: { type: "BOOLEAN", label: "Is Required", allowNull: false },
    },
    component: FormRelationInputBlock,
    componentType: "form",
  },
  formJSONInput: {
    config: {
      id: { type: "TEXT", label: "Field ID", allowNull: false },
      label: { type: "TEXT", label: "Label", allowNull: false },
      value: { type: "TEXT", label: "Initial JSON Value", allowNull: true },
      isRequired: { type: "BOOLEAN", label: "Is Required", allowNull: false },
    },
    component: FormJSONInputBlock,
    componentType: "form",
  },
  formButton: {
    config: {
      title: { type: "TEXT", label: "Button Title", allowNull: false },
    },
    component: FormButtonBlock,
    componentType: "form",
  },
};
