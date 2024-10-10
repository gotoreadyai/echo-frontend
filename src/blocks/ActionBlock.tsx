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

  // Efekt resetujący stan przy zmianie parametrów
  useEffect(() => {
    if (reloadOnParamsChange) {
      const newGetAll = JSON.stringify(getAll());
      if (currentGetAll !== newGetAll) {
        setCurrentGetAll(newGetAll);
        setIndex(0);
        setCompleted(false);
        setError(null);
        setComponent(null); // Resetowanie komponentu
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadOnParamsChange, getAll]);

  // Efekt ładujący komponenty akcji
  useEffect(() => {
    if (error) {
      return; // Jeśli wystąpił błąd, nie kontynuujemy
    }

    if (index < actions.length) {
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
    } else if (index >= actions.length && !completed) {
      setCompleted(true);
      onComplete?.(true); // Wywołanie callbacka z sukcesem
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, index, error, onComplete]);

  const handleActionResult = async (success: boolean) => {
    if (success) {
      // Dodaj małe opóźnienie, aby upewnić się, że stan się zaktualizował
      await new Promise((resolve) => setTimeout(resolve, 150));
      if (index < actions.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
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
    <div className="min-h-12 flex items-center justify-center mt-sm">
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
