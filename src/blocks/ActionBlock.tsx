// ActionBlock.tsx
import React, { useState, useEffect } from "react";
import { loadActionComponent } from "../utils/actions";
import ActionMsg from "../components/uikit/ActionMsg";
import useNavigation from "../hooks/useNavigation";

interface ActionBlockProps {
  actions: { scope: string; action: string }[];
  reloadOnParamsChange?: boolean;
  onComplete?: (success: boolean) => void; // Nowy props
}

const ActionBlock: React.FC<ActionBlockProps> = ({
  actions = [],
  reloadOnParamsChange = false,
  onComplete, // Destrukturyzacja props
}) => {
  const [Component, setComponent] = useState<React.FC<{
    scope: string;
    onActionResult: (success: boolean) => void;
  }> | null>(null);

  const [index, setIndex] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getAll } = useNavigation();
  const [currentGetAll, setCurrentGetAll] = useState<string>(JSON.stringify(getAll()));

  useEffect(() => {
    if (reloadOnParamsChange && currentGetAll !== JSON.stringify(getAll())) {
      setCurrentGetAll(JSON.stringify(getAll()));
      setIndex(0);
      setCompleted(false);
      setError(null);
    }

    if (actions[index] && !error) {
      const loadComponent = async () => {
        try {
          await loadActionComponent(
            actions[index].action,
            setComponent,
            setError
          );
        } catch (err) {
          setError("Failed to load component");
        }
      };

      loadComponent();
    } else if (index >= actions.length && !error) {
      setCompleted(true);
      onComplete?.(true); // Wywołanie callbacka z sukcesem
    }
  }, [
    actions,
    index,
    error,
    getAll,
    reloadOnParamsChange,
    currentGetAll,
    onComplete,
  ]);

  const handleActionResult = async (success: boolean) => {
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (index < actions.length - 1) {
        setIndex(index + 1);
      } else {
        setCompleted(true);
        onComplete?.(true); // Wszystkie akcje zakończone pomyślnie
      }
    } else {
      setError("Action failed");
      onComplete?.(false); // Wystąpił błąd w akcji
    }
  };

  return (
    <div className="min-h-12 flex items-center justify-center">
      {error && <ActionMsg type="error">{error}</ActionMsg>}
      {!completed && Component && actions[index] && !error && (
        <Component
          key={index}
          scope={actions[index].scope}
          onActionResult={handleActionResult}
        />
      )}
      {completed && !error && (
        <ActionMsg type="success">Actions queue complete</ActionMsg>
      )}
    </div>
  );
};

export default ActionBlock;
