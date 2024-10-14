// src/components/NotificationMessage.tsx
import React from "react";
import { FiAlertOctagon, FiCheck, FiInfo } from "react-icons/fi";
import { notifyColor } from "../../utils/display";
import { useGlobalStore } from "../../stores/globalStore";

const NotificationMsg: React.FC = () => {
  const { mainMessage } = useGlobalStore((state) => ({
    mainMessage: state.mainMessage,
  }));

  return mainMessage.message && mainMessage.type ? (
    <div className={`${notifyColor(mainMessage.type)} flex-1 rounded `}>
      <div className="flex h-full px-md items-center justify-start gap-sm  ">
        {mainMessage.type === "error" && (
          <FiAlertOctagon className="text-base" />
        )}
        {mainMessage.type === "success" && <FiCheck />}
        {mainMessage.type === "info" && <FiInfo />}
        {mainMessage.message}
      </div>
    </div>
  ) : null;
};

export default NotificationMsg;
