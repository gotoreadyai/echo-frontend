/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import ActionMsg from "../components/uikit/ActionMsg";

const AlertAction: React.FC = ({ scope, onActionResult }: any) => {
  const handleAction = async () => {};

  useEffect(() => {
    handleAction();
  }, []);

  return (
    <ActionMsg type="info">
      RUN: Alert Action for scope: {scope}{" "} |
      <div
        className="text-neutral underline cursor-pointer hover:bg-base-200 px-sm rounded-md"
        onClick={() => onActionResult(true)}
      >
        Continue
      </div>
    </ActionMsg>
  );
};
export default AlertAction;
