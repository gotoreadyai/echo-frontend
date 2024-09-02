// Text Block Component
export type TextBlockT = {
  content: string;
}
export const TextBlock: React.FC<TextBlockT> = ({ content }) => (
  <p className="container mx-auto">{content}</p>
);
