

import { CloseRight } from "../editor";
import SlotsRenderer from "../SlotsRenderer";


const CreateWorkspace: React.FC = () => {
  const slots = {
    workspacesList: [
      {
        id: "5b8d9266-a445-425b-aae2-59aa0b181314",
        filename: "SubmitForm",
        data: {
          actions: ["AlertAction", "InsertAction"],
          scope: "workspace",
        },
      },
    ],
  };

  return (
    <>
      <CloseRight callback={() => {}} label="Workspaces" />
      <div className="flex flex-col gap-sm p-sm">
        <SlotsRenderer slots={slots} slotName="workspacesList" />
      </div>
    </>
  );
};

export default CreateWorkspace;
