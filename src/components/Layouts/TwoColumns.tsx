
interface ContentProps {
  content:React.ReactElement | null;
}

const TwoColumns: React.FC<ContentProps> = ({ content }) => {
  return <div>TwoColumns:{content}</div>;
};

export default TwoColumns;
