import useNavigation from "../../hooks/useNavigation";
import { CloseRight } from "../editor";
import SlotsRenderer from "../SlotsRenderer";

const CreateWorkspace: React.FC = () => {
  const { getUSParam, setUSParam } = useNavigation();
  const view = getUSParam("rightview") || "table"; // Pobranie wartości rightview

  const updateRightview = (newView: string) => {
    setUSParam("rightview", newView);
  };

  const handleCreateNew = () => {
    updateRightview("createNew");
  };

  const handleClose = () => {
    updateRightview("table"); // Zmiana na widok "table" przy zamknięciu
  };

  const slots = {
    workspaceList: [
      {
        id: "e5a47be2-a39b-4dd7-b759-46e628e9eb82",
        filename: "ListTableBlock",
        data: {
          repeater: [
            {
              label: "Title",
              key: "title",
            },
            {
              label: "Slug",
              key: "slug",
            },
          ],
          url: "/dashboard/documents?workspace_id={id}",
          actions: [
            {
              icon: "edit",
              url: "rightview=edit&rightbar=workspaces&workspace_id={id}",
            },
            {
              icon: "trash",
              url: "rightview=delete&rightbar=workspaces&workspace_id={id}",
            },
          ],
          path: "workspaces.workspaces.items",
          className: "list-component-class",
        },
      },
    ],
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
          type: "hidden",
        },
      },
      {
        id: "a445",
        filename: "SubmitForm",
        data: {
          actions: [{ scope: "workspace", action: "InsertAction" }],
        },
      },
    ],
    workspaceUpdate: [
      {
        id: "854148c4-6371-4221-8f29-d9d17c662849",
        data: {
          reloadOnParamsChange: true,
          actions: [
            {
              scope: "workspaces.workspaces.items",
              action: "FilterScopeByIdAction",
            },
          ],
        },
        filename: "ActionBlock",
      },
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
          label: "Slug",
          fieldName: "workspace.slug",
          className: "",
          readonly: "readonly",
        },
      },
      {
        id: "425b",
        filename: "SubmitForm",
        data: {
          actions: [{ scope: "workspace", action: "UpdateAction" }],
        },
      },
    ],
    workspaceDelete: [
      {
        id: "854148c4-6371-4221-8f29-d9d17c662849",
        data: {
          reloadOnParamsChange: true,
          actions: [
            {
              scope: "workspaces.workspaces.items",
              action: "FilterScopeByIdAction",
            },
          ],
        },
        filename: "ActionBlock",
      },
      {
        id: "4343",
        filename: "InputBlock",
        data: {
          label: "Id",
          fieldName: "workspace.id",
          className: "",
        },
      },
      {
        id: "440d",
        filename: "InputBlock",
        data: {
          label: "Slug",
          fieldName: "workspace.slug",
          className: "",
          readonly: "readonly",
        },
      },
      {
        id: "425b",
        filename: "SubmitForm",
        data: {
          actions: [{ scope: "workspace", action: "DeleteAction" }],
        },
      },
    ],
  };

  return (
    <>
      <CloseRight callback={handleClose} label="Workspaces" />
      <div role="tablist" className="tabs tabs-bordered tabs-lg">
        <a
          role="tab"
          className={`tab ${view === "table" ? "tab-active" : ""}`}
          onClick={() => updateRightview("table")}
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
        <SlotsRenderer slots={slots} slotName={"workspaceList"} />
      )}

      {view === "createNew" && (
        <form className="flex flex-col gap-sm p-sm">
          <h2 className="font-extrabold text-3xl p-md">
            Create <br />
            new Workspace
          </h2>
          <SlotsRenderer slots={slots} slotName={"workspaceNew"} />
        </form>
      )}

      {view === "edit" && (
        <form className="flex flex-col gap-sm p-sm">
          <div className="p-md">
            <h2 className="font-extrabold text-3xl">Edit Workspace:</h2>
          </div>
          <SlotsRenderer slots={slots} slotName={"workspaceUpdate"} />
        </form>
      )}

      {view === "delete" && (
        <form className="flex flex-col gap-sm p-sm">
          <div className="p-md">
            <h2 className="font-extrabold text-3xl">Delete Workspace:</h2>
          </div>
          <SlotsRenderer slots={slots} slotName={"workspaceDelete"} />
        </form>
      )}
    </>
  );
};

export default CreateWorkspace;
