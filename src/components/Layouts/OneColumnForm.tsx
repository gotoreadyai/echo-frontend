import { TopBar } from "../CrudManager/TopBar";

interface ContentProps {
  content: React.ReactElement | null;
}

const OneColumnForm: React.FC<ContentProps> = ({ content }) => {
  return (
    <form>
      <TopBar />
      <div className="container mx-auto text-sm py-md">OneColumnForm layout:</div>
      {content}
    </form>
  );
};

export default OneColumnForm;
