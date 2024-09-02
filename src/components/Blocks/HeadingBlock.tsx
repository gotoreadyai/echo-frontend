export type HeadingBlockT = {
  level: number;
  content: string;
}
// Heading Block Component
export const HeadingBlock: React.FC<HeadingBlockT> = ({ level, content }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className="font-bold container mx-auto">{content}</Tag>;
};