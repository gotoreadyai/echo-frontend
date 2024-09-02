import { TopBar } from "../CrudManager/TopBar";

interface ContentProps {
  content: React.ReactElement | null;
}

const OneColumn: React.FC<ContentProps> = ({ content }) => {
  return (
    <>
      <TopBar />
      <div className="container mx-auto text-sm py-md">OneColumn layout:</div>
      {content}
    </>
  );
};

export default OneColumn;
