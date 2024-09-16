import React, { useEffect, useState } from "react";
import { loadActionComponent } from "../utils/actions";
import ActionMsg from "../components/uikit/ActionMsg";

const ActionBlock: React.FC<{
  actions: { scope: string; action: string }[];
}> = ({ actions = [] }) => {
  const [Component, setComponent] = useState<React.FC<{
    scope: string;
    onActionResult: (success: boolean) => void;
  }> | null>(null);

  const [index, setIndex] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (actions[index]) {
      loadActionComponent(actions[index].action, setComponent);
    } else if (index >= actions.length) {
      setCompleted(true);
    }
  }, [index, actions]);

  const handleActionResult = async (success: boolean) => {
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 750));
      if (index < actions.length - 1) {
        setIndex(index + 1);
      } else {
        setCompleted(true); 
      }
    } else {
      alert("Action failed");
    }
  };

  return (
    <>
      {!completed && Component && actions[index] && (
        <Component
          key={index}
          scope={actions[index].scope}
          onActionResult={handleActionResult}
        />
      )}
      {completed && <ActionMsg type="success">Actions queue complete</ActionMsg>}
    </>
  );
};

export default ActionBlock;
