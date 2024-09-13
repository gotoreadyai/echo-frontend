import { FiImage } from "react-icons/fi";

export const ImageSchema = {
  id: "d1e9bb07-0b85-4860-bf19-0ec647c6f8b7",
  filename: "Image",
  jsonSchema: {
    title: "Image Block",
    properties: {
      url: { type: "string", label: "Image URL" },
      className: { type: "string", label: "CSS Class" },
    },
  },
  icon: FiImage,
  group: "content",
  data: { url: "https://via.placeholder.com/150", className: "image-class" },
};

export default ImageSchema;
