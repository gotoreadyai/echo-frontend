/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { CloseRight } from "../editor";
import SlotsRenderer from "../SlotsRenderer";
import { FiEdit } from "react-icons/fi";

const CreateWorkspace: React.FC = () => {
  const [view, setView] = useState<"table" | "createNew" | "edit">("table");
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);

  const slots = {
    workspaceNew: [
      {
        id: "4bab",
        filename: "InputBlock",
        data: {
          label: "Title",
          fieldName: "workspace.title",
          className: "",
        },
      },
      {
        id: "889c",
        filename: "InputBlock",
        data: {
          label: "Content",
          fieldName: "workspace.content",
          className: "",
          default: "default",
        },
      },
      {
        id: "a445",
        filename: "SubmitForm",
        data: {
          actions: ["AlertAction", "InsertAction"],
          scope: "workspace",
        },
      },
    ],
    workspaceUpdate: [
      {
        id: "4343",
        filename: "InputBlock",
        data: {
          label: "Title",
          fieldName: "workspace.title",
          className: "",
        },
      },
      {
        id: "440d",
        filename: "InputBlock",
        data: {
          label: "Content",
          fieldName: "workspace.content",
          className: "",
          default: "default",
        },
      },
      {
        id: "425b",
        filename: "SubmitForm",
        data: {
          actions: ["AlertAction", "InsertAction"],
          scope: "workspace",
        },
      },
    ],
  };

  const handleCreateNew = () => {
    setView("createNew");
    setSelectedWorkspace(null);
  };

  const handleEdit = (workspace: any) => {
    setView("edit");
    setSelectedWorkspace(workspace);
  };

  return (
    <>
      <CloseRight callback={() => {}} label="Workspaces" />
      <div role="tablist" className="tabs tabs-bordered tabs-lg">
        <a
          role="tab"
          className={`tab ${view === "table" ? "tab-active" : ""}`}
          onClick={() => setView("table")}
        >
          List
        </a>
        <a
          role="tab"
          className={`tab ${view === "createNew" ? "tab-active" : ""}`}
          onClick={handleCreateNew}
        >
          Create new
        </a>
      </div>

      {view === "table" && (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Sample row 1 */}
            <tr onClick={() => handleEdit({ name: "Cy Ganderton" })}>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td><div><FiEdit/></div></td>
            </tr>
            {/* Sample row 2 */}
            <tr onClick={() => handleEdit({ name: "Hart Hagerty" })}>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
              <td><div><FiEdit/></div></td>
            </tr>
            {/* Sample row 3 */}
            <tr onClick={() => handleEdit({ name: "Brice Swyre" })}>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
              <td><div><FiEdit/></div></td>
            </tr>
          </tbody>
        </table>
      )}

      {view === "createNew" && (
        <form className="flex flex-col gap-sm p-sm">
          <h2 className="font-extrabold text-3xl p-md" >Create <br/>new Workspace</h2>
          <SlotsRenderer slots={slots} slotName={"workspaceNew"} />
        </form>
      )}

      {view === "edit" && selectedWorkspace && (
        <form className="flex flex-col gap-sm p-sm">
          <div className="p-md">
          <p>{selectedWorkspace.name}</p>
          <h2 className="font-extrabold text-3xl" >Edit Workspace:</h2>
          </div>
         
          
          <SlotsRenderer slots={slots} slotName={"workspaceUpdate"} />
        </form>
      )}
    </>
  );
};

export default CreateWorkspace;
