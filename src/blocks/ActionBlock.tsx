/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ActionItem } from "../types/actionsTypes";
import { useLocation, useParams } from "react-router-dom";
import { PathParams } from "../types/types";
import { notifyColor } from "../utils/display";

interface ActionBlockProps {
  actions: ActionItem[];
}

const ActionBlock: React.FC<ActionBlockProps> = ({ actions }) => {
  const { slug } = useParams<PathParams>();
  const location = useLocation();
  const [executedActions, setExecutedActions] = useState<ActionItem[]>([]);
  const [reload, setReload] = useState(false);

  const actionsExecutor = async () => {
    const actionsExecuted: ActionItem[] = [];

    for (const action of actions) {
      if (action.action && action.scope) {
        try {
          const actionFn = await import(`../actions/${action.action}`);
          await actionFn.default(action.scope);
          actionsExecuted.push(action);
        } catch (error) {
          console.error(`Error executing action: ${action.action}`, error);
        }
      }
    }

    setExecutedActions(actionsExecuted);
  };

  useEffect(() => {
    // Reset executed actions when location or actions change
    setExecutedActions([]);
    actionsExecutor();
  }, [location, actions]);

  useEffect(() => {
    if (reload) {
      // Reset executed actions when reloading
      setExecutedActions([]);
      actionsExecutor();
      setReload(false);
    }
  }, [reload]);

  const handleReload = () => {
    setReload(true);
  };

  const actionsWithScope = actions.filter((action) => action.scope);

  if (actionsWithScope.length === 0) {
    return null;
  }

  return (
    <div key={slug} className="container mx-auto mt-sm bg-base-100 rounded">
      <div className="mt-4 text-xs border border-base-300 flex flex-col gap-sm p-md rounded">
        <h3 className="">Wykonane akcje:</h3>
        <ul className="flex flex-col gap-px">
          {executedActions.map((actionItem, index) => (
            <li
              className={`${notifyColor("success")} p-sm rounded opacity-75`}
              key={`${actionItem.action}-${index}`}
            >
              {index}: {actionItem.action} {actionItem.scope}
            </li>
          ))}
          <li>
            <button
              className="btn btn-sm btn-outline btn-secondary no-animation"
              onClick={handleReload}
            >
              Przeładuj akcje dla {slug}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActionBlock;
