
import { Content } from "../Blocks/Types";
import { ContextModels } from "../CrudManager/ContextModels";
import { CrudManager } from "../CrudManager/CrudManager";
import DaisyDrawer from "../DaisyDrawer";


const MainDashboard: React.FC<Content> = ({ content }) => {
  console.log(content);
  
  return (
    <DaisyDrawer items={<ContextModels/>}>
      <div className="min-h-full flex flex-col gap-md">
        <CrudManager />
      </div>
    </DaisyDrawer>
  );
};

export default MainDashboard;