// List Block Component
export const ListBlock: React.FC<{ items: string[]; ordered?: boolean }> = ({
  items,
  ordered = false,
}) => {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="list-disc list-inside my-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </Tag>
  );
};
