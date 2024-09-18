// SubmitForm.tsx
import React, { useState } from "react";
import ActionBlock from "./ActionBlock";

const SubmitForm: React.FC<{
  className?: string;
  actions: { scope: string; action: string }[];
}> = ({ className, actions = [] }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [triggerActions, setTriggerActions] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null); // Nowy stan dla komunikatu

  const handleSubmit = async () => {
   setLoading(true);
   setTriggerActions(true);
   setResultMessage(null); // Resetowanie komunikatu
  };

  const handleActionsComplete = (success: boolean) => {
    setLoading(false);
    setTriggerActions(false);
    if (success) {
      setResultMessage("Akcje zakończone pomyślnie!");
    } else {
      setResultMessage("Wystąpił błąd podczas wykonywania akcji.");
    }
  };

  return (
    <div className={className || "container mx-auto"}>
      <button
        onClick={handleSubmit}
        type="button"
        className="btn btn-primary w-full no-animation"
        disabled={loading}
        aria-labelledby="Submit Form"
      >
        {loading ? "Processing..." : "Submit Form"}
      </button>

      {triggerActions && (
        <ActionBlock
          actions={actions}
          reloadOnParamsChange={false}
          onComplete={handleActionsComplete} // Przekazanie callbacka
        />
      )}

      {resultMessage && (
        <div className={`mt-4 ${resultMessage.includes("błąd") ? "text-red-500" : "text-green-500"}`}>
          {resultMessage}
        </div>
      )}
    </div>
  );
};

export default SubmitForm;
