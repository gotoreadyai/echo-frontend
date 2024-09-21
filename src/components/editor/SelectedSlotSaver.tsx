/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useBlockStore } from "../../stores/blockStore";
import { useParams } from "react-router-dom";
import { layoutsConfig } from "../../data/layoutsConfig";

import { PathParams } from "../../types/types";
import { usePageStore } from "../../stores/pageStore";
import { genErrorMessage } from "../../utils/actions";
import { FiSave } from "react-icons/fi";
import { useGlobalStore } from "../../stores/globalStore"; // Import globalStore
import useNavigation from "../../hooks/useNavigation";
import { useCrudMutations } from "../../hooks";

const SelectedSlotSaver: React.FC = () => {
  const { getUSParam } = useNavigation();
  const { layout } = usePageStore((state) => ({
    layout: state.pageData.layout,
  }));

  const { selectedSlot, slots } = useBlockStore((state) => ({
    selectedSlot: state.selectedSlot,
    slots: state.slots,
  }));

  const { workspace, slug } = useParams<PathParams>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { updateContentMutation } = useCrudMutations<any>({
    model: "content",
    setSelectedItem: () => {},
    setErrorMessage,
  });

  const setMainMessage = useGlobalStore((state) => state.setMainMessage); // Access setMainMessage from globalStore

  const handleSaveContent = () => {
    if (selectedSlot) {
      const isParent = layoutsConfig[layout].parentSlots.includes(selectedSlot);
      const resolvedSlug = isParent ? workspace : slug;
      if (!resolvedSlug) {
        setErrorMessage("Slug is undefined. Cannot save content.");
        setMainMessage("Slug is undefined. Cannot save content.", "error"); // Set error message
        return;
      }

      updateContentMutation.mutate(
        {
          model: isParent ? "workspace" : "document",
          slug: resolvedSlug,
          slot: selectedSlot,
          content: slots[selectedSlot],
        },
        {
          onSuccess: () => {
            setMainMessage("Content saved successfully!", "success"); // Set success message
          },
          onError: (error: any) => {
            console.log(error);
            
            setMainMessage(genErrorMessage(error, selectedSlot), "error"); // Set error message
          },
        }
      );
    } else {
      setMainMessage("No slot selected to save.", "error"); // Set error message for no slot selected
    }
  };

  const rightbar = getUSParam("rightbar");

  return (
    <div className="p-md border-t border-base-300">
      {!rightbar? (
        <>
          <span className="font-semibold">Selected Slot: </span>
          <span>{selectedSlot ? selectedSlot : "No slot selected"}</span>
        </>
      ) : <div className="text-center">SLOT</div>}
      {errorMessage && <div className="bg-error"></div>}
      {selectedSlot && (
        <button
         aria-label="Save"
          onClick={handleSaveContent}
          className="btn btn-md btn-outline w-full no-animation font-light mt-sm"
        >
          <FiSave /> {!rightbar && <span>Save selected slot data</span>}
        </button>
      )}
    </div>
  );
};

export default SelectedSlotSaver;
