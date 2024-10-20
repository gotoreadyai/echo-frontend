import { createItem } from "../../services/genericService";
import { useBlockStore, useGlobalStore } from "../../stores";
import { CloseRight } from "../editor";
import { useParams } from "react-router-dom";
import { Plugins } from "../../../models_EXPORT/plugins";
import { FiAlignLeft, FiDatabase, FiFile } from "react-icons/fi";
import { PathParams } from "../../types/types";

const PluginUpdater: React.FC = () => {
  const { workspace, slug } = useParams<PathParams>();
  const slots = useBlockStore((state) => state.slots);
  const setMainMessage = useGlobalStore((state) => state.setMainMessage);
  const params = useParams<{
    workspace: string;
    slug: string;
    action?: string;
  }>();

  const handlePluginUpdate = async (plugin: string, type: string) => {
    try {
      const filteredSlots = { ...slots };
      delete filteredSlots.footer;
      delete filteredSlots.header;

      const res = await createItem(`seed/${type==="Content" ? slug : ''}`, {
        name: params.slug,
        data: filteredSlots,
        plugin,
        type,  // Add the type to the payload
        workspace,
        slug,
      });

      setMainMessage(`${res.message} w: ${res.filePath}`, "success");
    }catch (error) {
        if (error instanceof Error) {
          setMainMessage(`Error updating plugin: ${error.message}`, "error");
        } else {
          setMainMessage(`Error updating plugin: ${String(error)}`, "error");
        }
      }
  };

  return (
    <>
      <CloseRight callback={() => {}} label="Plugins updater " />
      <p className="text-lg p-sm px-md">This is advanced logic!!!</p>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-full">Select to update plugin:</th>
            <th>F</th>
            <th>C</th>
            <th>M</th>
          </tr>
        </thead>
        <tbody>
          {Plugins.map((plugin) => (
            <tr key={plugin} className="select-none">
              <td>{plugin}</td>
              <td>
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => handlePluginUpdate(plugin, "File")} // "P" type
                >
                  <FiFile />
                </button>
              </td>
              <td>
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => handlePluginUpdate(plugin, "Content")} // "C" type
                >
                  <FiAlignLeft />
                </button>
              </td>
              <td>
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => handlePluginUpdate(plugin, "Model")} // "M" type
                >
                  <FiDatabase />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PluginUpdater;
