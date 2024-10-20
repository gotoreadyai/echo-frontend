import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useBlockStore } from "../stores/blockStore";
import { Block } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const KeyboardHandler: React.FC = () => {
  const {
    isEditing,
    selectedSlot,
    selectedBlock,
    copiedBlocks,
    setCopiedBlocks,
    addBlockToSlot,
    removeBlock,
    deselectBlock,
    moveBlock,
  } = useBlockStore();

  const navigate = useNavigate();
  const location = useLocation(); // Użyj useLocation
  const { workspace, slug, action } = useParams<{
    workspace: string;
    slug: string;
    action?: string;
  }>();

  const isFieldFocused = () => {
    const activeElement = document.activeElement;
    const isTextField =
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement ||
      (activeElement instanceof HTMLElement && activeElement.isContentEditable);

    return isTextField;
  };

  // Handler for Tab key navigation
  const handleTabKey = useCallback(() => {
    if (!workspace || !slug) {
      console.error("Missing routing parameters: workspace or slug.");
      return;
    }
    const newAction = action === "edit-document" ? "" : "/edit-document";


   


    // Zachowaj query string podczas nawigacji
    navigate(
      {
        pathname: `/${workspace}/${slug}${newAction}`,
        search: location.search, // Uwzględnij bieżący query string
        clearParams: ["rightbar"]
      },
      { replace: true }
    );
  }, [navigate, workspace, slug, action, location.search]);

  // Handler for Ctrl + E shortcut
  const handleCtrlE = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("rightbar", "workspaces");
    navigate(
      {
        pathname: location.pathname, // Użyj bieżącej ścieżki
        search: `?${searchParams.toString()}`, // Dodaj zaktualizowany query string
      },
      { replace: true }
    );
  }, [navigate, location.pathname, location.search]);

  // Handler for Ctrl + C (Copy)
  const handleCtrlC = useCallback(() => {
    if (selectedBlock) {
      setCopiedBlocks([selectedBlock]);
    }
  }, [selectedBlock, setCopiedBlocks]);

  // Handler for Ctrl + V (Paste)
  const handleCtrlV = useCallback(() => {
    if (selectedSlot && copiedBlocks.length > 0) {
      copiedBlocks.forEach((block) => {
        const newBlock: Block = { ...block, id: uuidv4() };
        addBlockToSlot(selectedSlot, newBlock);
      });
    }
  }, [selectedSlot, copiedBlocks, addBlockToSlot]);

  // Handler for Delete key
  const handleDelete = useCallback(() => {
    if (selectedBlock && selectedSlot) {
      removeBlock(selectedBlock.id, selectedSlot);
      deselectBlock();
    }
  }, [selectedBlock, selectedSlot, removeBlock, deselectBlock]);

  // Handler for Arrow keys (Move Block)
  const handleArrowKeys = useCallback(
    (direction: "up" | "down") => {
      if (selectedBlock && selectedSlot) {
        moveBlock(selectedBlock.id, selectedSlot, direction);
      }
    },
    [selectedBlock, selectedSlot, moveBlock]
  );

  // Handler for Ctrl + Q
  const handleCtrlQ = useCallback(() => {
    alert("Q");
  }, []);

  // Keydown event handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isEditing) return;

      switch (e.key) {
        case "Tab":
          if (!isFieldFocused()) {
            e.preventDefault();
            handleTabKey();
          }
          break;

        case "e":
        case "E":
          if (e.ctrlKey) {
            e.preventDefault();
            handleCtrlE();
          }
          break;

        case "c":
        case "C":
          if (e.ctrlKey && !isFieldFocused()) {
            e.preventDefault();
            handleCtrlC();
          }
          break;

        case "v":
        case "V":
          if (e.ctrlKey && !isFieldFocused()) {
            e.preventDefault();
            handleCtrlV();
          }
          break;

        case "q":
        case "Q":
          if (e.ctrlKey) {
            e.preventDefault();
            handleCtrlQ();
          }
          break;

        case "Delete":
          e.preventDefault();
          handleDelete();
          break;

        case "ArrowUp":
          e.preventDefault();
          handleArrowKeys("up");
          break;

        case "ArrowDown":
          e.preventDefault();
          handleArrowKeys("down");
          break;

        default:
          break;
      }
    },
    [
      isEditing,
      handleTabKey,
      handleCtrlE,
      handleCtrlC,
      handleCtrlV,
      handleCtrlQ,
      handleDelete,
      handleArrowKeys,
    ]
  );

  // Effect to add and clean up the keydown listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return null;
};

export default KeyboardHandler;
