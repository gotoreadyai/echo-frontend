// src/components/NotificationMessage.tsx
import React, { ReactNode } from "react";

import { useGlobalStore } from "../../stores/globalStore";

const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <dialog id="my_modal_1" className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl">
        {children}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() =>
                useGlobalStore.setState(() => ({
                  scopeManager: {
                    ...useGlobalStore.getState().scopeManager,
                    selectedRJSF_Id: "",
                  },
                }))
              }
              className="btn"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
