import { BlockDetailsPanel } from "./editor";
import PluginUpdater from "./pluginUpdater/PluginUpdater";
import LoginForm from "./user/LoginForm";
import CreateWorkspace from "./workspaces/CreateWorkspace";

const RightBar: React.FC = () => {
  const rightbar = new URLSearchParams(window.location.search).get("rightbar");
  return (
    <>
      {rightbar === "user" && <LoginForm />}
      {rightbar === "block" && <BlockDetailsPanel />}
      {rightbar === "workspaces" && <CreateWorkspace />}
      {rightbar === "pluginupdater" && <PluginUpdater />}
    </>
  );
};

export default RightBar;
