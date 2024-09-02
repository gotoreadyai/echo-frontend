
export type ListBlockT = {
  items: string[];
  ordered?: boolean;
}
export const ListBlock: React.FC<ListBlockT> = ({
  items,
  ordered = false,
}) => {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="list-disc list-inside container mx-auto">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </Tag>
  );
};
