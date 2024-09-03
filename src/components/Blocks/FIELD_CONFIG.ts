import { FieldConfig } from "../CrudManager/Types";

export const FIELD_CONFIG: Record<string, Record<string, FieldConfig>> = {
  text: {
    content: { type: "TEXT", label: "Content", allowNull: false },
  },
  image: {
    src: { type: "TEXT", label: "Image URL", allowNull: false },
    alt: { type: "TEXT", label: "Alt Text", allowNull: true },
  },
  heading: {
    content: { type: "TEXT", label: "Heading Content", allowNull: false },
    level: { type: "TEXT", label: "Heading Level", allowNull: false },
  },
  quote: {
    content: { type: "TEXT", label: "Quote Content", allowNull: false },
    author: { type: "TEXT", label: "Author", allowNull: true },
  },
  list: {
    items: { type: "TEXT", label: "List Items", allowNull: false },
    ordered: { type: "TEXT", label: "Ordered List", allowNull: true },
  },
  link: {
    to: { type: "TEXT", label: "Link URL", allowNull: false },
    text: { type: "TEXT", label: "Link Text", allowNull: false },
    target: { type: "TEXT", label: "Target (optional)", allowNull: true },
  },

  formTextInput: {
    id: { type: "TEXT", label: "Field ID", allowNull: false },
    label: { type: "TEXT", label: "Label", allowNull: false },
    value: { type: "TEXT", label: "Initial Value", allowNull: true },
    isRequired: { type: "BOOLEAN", label: "Is Required", allowNull: false },
  },
  formTextarea: {
    id: { type: "TEXT", label: "Field ID", allowNull: false },
    label: { type: "TEXT", label: "Label", allowNull: false },
    value: { type: "TEXT", label: "Initial Value", allowNull: true },
    isRequired: { type: "BOOLEAN", label: "Is Required", allowNull: false },
  },
  formSelectInput: {
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
  formRelationInput: {
    id: { type: "TEXT", label: "Field ID", allowNull: false },
    label: { type: "TEXT", label: "Label", allowNull: false },
    value: { type: "TEXT", label: "Initial Value", allowNull: true },
    isRequired: { type: "BOOLEAN", label: "Is Required", allowNull: false },
  },
  formJSONInput: {
    id: { type: "TEXT", label: "Field ID", allowNull: false },
    label: { type: "TEXT", label: "Label", allowNull: false },
    value: { type: "TEXT", label: "Initial JSON Value", allowNull: true },
    isRequired: { type: "BOOLEAN", label: "Is Required", allowNull: false },
  },
  formButton: {
    title: { type: "TEXT", label: "Button Title", allowNull: false },
  },
};
