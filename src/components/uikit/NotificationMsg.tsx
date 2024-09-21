// src/components/NotificationMessage.tsx
import React from "react";
import { FiAlertOctagon, FiCheck, FiInfo } from "react-icons/fi";
import { notifyText } from "../../utils/display";
import { useGlobalStore } from "../../stores/globalStore";

const NotificationMsg: React.FC = () => {
  const { mainMessage } = useGlobalStore((state) => ({
    mainMessage: state.mainMessage,
  }));

  return mainMessage.message && mainMessage.type ? (
    <div
      className={`${notifyText(
        mainMessage.type
      )}  fixed top-0 left-0 text-base w-full z-30 flex justify-center items-center p-sm pointer-events-none    `}
    >
      <div className="flex py-xs px-md items-center justify-center gap-sm bg-base-300 rounded -mt-px">
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
