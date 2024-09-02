
import { ContextModels } from "../CrudManager/ContextModels";
import { CrudManager } from "../CrudManager/CrudManager";
import DaisyDrawer from "../DaisyDrawer";


interface ContentProps {
  content: React.ReactElement | null;
}

const MainDashboard: React.FC<ContentProps> = ({ content }) => {
  return (
    <DaisyDrawer items={<ContextModels/>}>
      <div className="min-h-full flex flex-col gap-md">
        <CrudManager />
        {content}
      </div>
    </DaisyDrawer>
  );
};

export default MainDashboard;