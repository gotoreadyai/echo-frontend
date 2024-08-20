
// Heading Block Component
export const HeadingBlock: React.FC<{ level: number; content: string }> = ({ level, content }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className="font-bold my-4">{content}</Tag>;
};