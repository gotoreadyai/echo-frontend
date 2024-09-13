/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import BlockRenderer from "./BlockRenderer";
import { useBlockStore } from "../stores/blockStore";
import { useLocation, useNavigate } from "react-router-dom";
import { pattern_bg } from "../data/styles";
import { FiCheckCircle } from "react-icons/fi";

interface SlotsRendererProps {
  slots: Record<string, any>;
  slotName: string;
}

const SlotsRenderer: FC<SlotsRendererProps> = ({ slots, slotName }) => {
  const {
    selectedSlot,
    selectedBlock,
    setSelectedSlot,
    setSelectedBlock,
    isEditing,
  } = useBlockStore();

  const location = useLocation();
  const navigate = useNavigate();

  // Funkcja obsługująca kliknięcie w slot
  const handleSlotClick = () => {
    if (isEditing && selectedSlot !== slotName) {
      setSelectedSlot(slotName);
      setSelectedBlock(null);

      // Zaktualizuj parametry URL, usuwając "rightbar" gdy nie ma bloku zaznaczonego
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("rightbar");
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    }
  };

  // Funkcja obsługująca kliknięcie w blok
  const handleBlockClick = (block: any) => {
    setSelectedBlock(block);
    setSelectedSlot(slotName);

    // Zaktualizuj parametry URL, aby dodać "rightbar" gdy blok jest zaznaczony
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("rightbar", "block");
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  };

  // Ensure slots[slotName] is an array
  // if (!(slots[slotName])) {
  //   return <div>No content for {slotName}</div>;
  // }

  return (
    <>
      <div
        className={`absolute w-full h-full border z-10 pointer-events-none ${
          selectedSlot === slotName ? "border-primary" : "border-base-300 "
        }`}
      ></div>
      <div
        onClick={handleSlotClick}
        className={`absolute -top-8 h-8 z-10 rounded-t ${
          selectedSlot === slotName ? "bg-primary" : "bg-base-300 "
        }`}
      >
        <div className="flex px-md gap-xs items-center h-full text-sm cursor-pointer">
          <FiCheckCircle className={`${selectedSlot === slotName ? "text-neutral" : "text-warning"}`} />
          <span  className={`${selectedSlot === slotName ? "text-neutral" : ""}`}>{slotName}</span>
        </div>
        <div
          className="absolute w-full h-full top-0 "
          onClick={handleSlotClick}
        ></div>
      </div>
      <div className="h-px"></div>
      {slots[slotName] &&
        slots[slotName].map((block: any) => (
          <div key={block.id} className="block-wrapper m-px relative">
            <BlockRenderer block={block} />
            {/* <!-- Border around selected block --> */}
            <div
              style={selectedBlock?.id === block.id ? pattern_bg : {}}
              className={`absolute top-px bottom-px left-px right-px w-full h-full border  ${
                selectedBlock?.id === block.id
                  ? "bg-primary bg-opacity-10 border-secondaary"
                  : "border-base-300 border-dashed"
              }`}
              onPointerDown={(e) => {
                e.stopPropagation();
                handleBlockClick(block);
              }}
            ></div>
          </div>
        ))}
    </>
  );
};

export default SlotsRenderer;
